
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { environment } from '../environments/environments';
import { ReqOrderDTO, ReqUpdateOrderStatusDTO, ResOrderDTO } from '../dtos/order';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiOrder = `${environment.apiBaseUrl}/orders`;
    constructor(private http: HttpClient) { }

    getOrders(page: number, pageSize: number): Observable<{ orders: any[]; meta: any }> {
        const params = new HttpParams()
            .set('page', String(page - 1))  // UI 1-based -> Spring 0-based
            .set('size', String(pageSize));

        return this.http.get<any>(this.apiOrder, { params }).pipe(
            map(res => ({
                orders: res.data.result,   // backend trả về ResultPaginationDTO
                meta: res.data.meta
            }))
        );
    }

    createOrder(req: ReqOrderDTO): Observable<ResOrderDTO> {
        return this.http.post<ResOrderDTO>(this.apiOrder, req);
    }
    updateOrderStatus(id: number, req: ReqUpdateOrderStatusDTO
    ): Observable<ResOrderDTO> {
        return this.http.put<ResOrderDTO>(`${this.apiOrder}/${id}`, req);
    }
}