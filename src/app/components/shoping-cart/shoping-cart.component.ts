import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from 'src/app/service/cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.css']
})
export class ShopingCartComponent implements OnInit {
  items: CartItem[] = [];
  total: number = 0;
  selectAll: boolean = false;

  constructor(
    public cartService: CartService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadCart();
  }

  // ------------------------
  // Load + tính toán
  // ------------------------
  loadCart(): void {
    this.items = this.cartService.getItems().map(i => ({
      ...i,
      selected: i.selected ?? false // đảm bảo có selected
    }));
    this.updateTotal();
    this.updateSelectAllState();
  }

  updateTotal(): void {
    this.total = this.items
      .filter(i => i.selected)
      .reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  updateSelectAllState(): void {
    this.selectAll = this.items.length > 0 && this.items.every(i => i.selected);
  }

  // ------------------------
  // Checkbox
  // ------------------------
  toggleSelectAll(): void {
    this.items.forEach(i => (i.selected = this.selectAll));
    this.updateTotal();
  }

  toggleItemSelection(item: CartItem): void {
    item.selected = !item.selected;
    this.updateSelectAllState();
    this.updateTotal();
  }

  // ------------------------
  // Số lượng
  // ------------------------
  increaseQty(item: CartItem): void {
    this.cartService.updateQuantity(item.productId, item.variantId, item.quantity + 1);
    this.loadCart();
  }

  decreaseQty(item: CartItem): void {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.productId, item.variantId, item.quantity - 1);
      this.loadCart();
    }
  }

  // ------------------------
  // Xóa item
  // ------------------------
  removeItem(item: CartItem): void {
    this.cartService.removeItem(item.productId, item.variantId);
    this.loadCart();
  }

  // ------------------------
  // Checkout
  // ------------------------
  proceedToCheckout(): void {
    const selectedItems = this.items.filter(i => i.selected);

    if (selectedItems.length === 0) {
      this.toastr.warning('Vui lòng chọn ít nhất 1 sản phẩm để thanh toán!');
      return;
    }

    // 👉 lưu selectedItems vào CartService hoặc localStorage để Checkout dùng
    this.cartService.setCheckoutItems(selectedItems);

    // 👉 điều hướng sang trang checkout
    this.router.navigate(['/checkout']);
  }
}
