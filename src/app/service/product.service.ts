import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { map, Observable } from 'rxjs';
import { ProductDTO } from '../dtos/product';



@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private apiProduct = `${environment.apiBaseUrl}/products`;
    constructor(private http: HttpClient) { }


    // Lấy danh sách sản phẩm có phân trang
    getProducts(page = 1, pageSize = 10): Observable<{ products: any[]; meta: any }> {
        const params = new HttpParams()
            .set('page', String(page - 1))  // UI 1-based -> Spring 0-based
            .set('size', String(pageSize));

        return this.http.get<any>(this.apiProduct, { params }).pipe(
            map(res => ({
                products: res.data.result,   // backend trả về ResultPaginationDTO
                meta: res.data.meta
            }))
        );
    }

    // Lấy chi tiết sản phẩm theo ID
    getProductById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiProduct}/${id}`).pipe(
            map(res => res.data)
        );
    }

    // Tạo mới sản phẩm
    createProduct(product: ProductDTO): Observable<any> {
        return this.http.post<any>(this.apiProduct, product).pipe(
            map(res => res.data)
        );
    }

    // Cập nhật sản phẩm
    updateProduct(id: number, product: Partial<ProductDTO>): Observable<any> {
        return this.http.put<any>(`${this.apiProduct}/${id}`, product).pipe(
            map(res => res.data)
        );
    }

    // Xóa sản phẩm
    deleteProduct(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiProduct}/${id}`).pipe(
            map(res => res.data)
        );
    }



}