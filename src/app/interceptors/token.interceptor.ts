import { Injectable } from "@angular/core";
import {
    HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse
} from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { catchError, filter, switchMap, take } from "rxjs/operators";
import { TokenService } from "../service/token.service";
import { AuthService } from "../service/auth.service";
import { environment } from "src/app/environments/environments";

@Injectable({ providedIn: "root" })
export class TokenInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject = new BehaviorSubject<string | null>(null);

    constructor(
        private tokenService: TokenService,
        private authService: AuthService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.getToken();

        // Chỉ gắn token cho request đi tới BE và không phải các endpoint auth
        const isApi = req.url.startsWith(environment.apiBaseUrl);
        const isAuthEndpoint = /\/auth\/(login|refresh|register)$/.test(req.url);

        let authReq = req;
        if (token && isApi && !isAuthEndpoint) {
            authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        }

        return next.handle(authReq).pipe(
            catchError((error: any) => {
                if (error instanceof HttpErrorResponse && error.status === 401 && !isAuthEndpoint) {
                    return this.handle401Error(authReq, next);
                }
                return throwError(() => error);
            })
        );
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refresh().pipe(
                switchMap((res: any) => {
                    this.isRefreshing = false;

                    const newToken = res?.data?.access_token;
                    if (!newToken) {
                        // không có token mới -> coi như fail
                        this.tokenService.removeToken();
                        return throwError(() => new Error("Refresh response missing access_token"));
                    }

                    this.tokenService.setToken(newToken);
                    this.refreshTokenSubject.next(newToken);

                    return next.handle(
                        request.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } })
                    );
                }),
                catchError(err => {
                    this.isRefreshing = false;
                    this.tokenService.removeToken();
                    // Có thể điều hướng về /login tại đây nếu muốn
                    return throwError(() => err);
                })
            );
        } else {
            // Hàng đợi: chờ token mới rồi retry
            return this.refreshTokenSubject.pipe(
                filter((token): token is string => token !== null),
                take(1),
                switchMap(token =>
                    next.handle(
                        request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
                    )
                )
            );
        }
    }
}
