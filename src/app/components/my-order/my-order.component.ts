import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { ToastrService } from 'ngx-toastr';
import { ReqUpdateOrderStatusDTO } from 'src/app/dtos/order';

@Component({
    selector: 'app-my-order',
    templateUrl: './my-order.component.html'
})
export class MyOrdersComponent implements OnInit {
    orders: any[] = [];
    meta: any;
    page = 1;
    pageSize = 2;

    constructor(private orderService: OrderService, private toastr: ToastrService) { }

    ngOnInit(): void {
        this.loadOrders();
    }

    loadOrders(): void {
        this.orderService.getOrders(this.page, this.pageSize).subscribe({
            next: (res) => {
                this.orders = res.orders;
                this.meta = res.meta;
            },
            error: (err) => console.error(err)
        });
    }

    changePage(newPage: number): void {
        this.page = newPage;
        this.loadOrders();
    }
    cancelOrder(order: any): void {
        if (!confirm(`Bạn có chắc muốn hủy đơn #${order.id}?`)) return;

        const req: ReqUpdateOrderStatusDTO = { status: 'CANCELLED' };

        this.orderService.updateOrderStatus(order.id, req).subscribe({
            next: (updated) => {
                // cập nhật lại trong danh sách
                const idx = this.orders.findIndex(o => o.id === order.id);
                if (idx > -1) {
                    this.orders[idx] = { ...this.orders[idx], status: 'CANCELLED' };
                }
                this.toastr.success('Đơn hàng đã được hủy');
            },
            error: () => this.toastr.error('Hủy đơn hàng thất bại')
        });
    }
    reviewProduct(item: any): void {
        // Điều hướng sang ProductDetail, truyền cả orderDetailId
        window.location.href = `/product-detail/${item.productId}?orderDetailId=${item.id}`;
    }

}
