import { Component, ViewChild } from '@angular/core';
import { BaseModalComponent } from 'src/app/shared/base-modal/base-modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  @ViewChild('addProductModal') addProductModal!: BaseModalComponent;

  categories = ['Áo', 'Quần', 'Váy', 'Phụ kiện'];

  newProduct: any = {
    name: '',
    price: 0,
    quantity: 0,
    category: '',
    description: '',
    image: ''
  };

  products: any[] = []; // danh sách sản phẩm để hiển thị

  editingIndex: number | null = null; // theo dõi đang sửa hay thêm

  handleAddProduct() {
    // kiểm tra dữ liệu
    if (!this.newProduct.name || !this.newProduct.price || !this.newProduct.quantity || !this.newProduct.category) {
      alert('Vui lòng nhập đầy đủ thông tin sản phẩm!');
      return;
    }

    if (this.editingIndex !== null) {
      // đang sửa sản phẩm
      this.products[this.editingIndex] = { ...this.newProduct };
      alert('Sửa sản phẩm thành công!');
    } else {
      // thêm mới
      this.products.push({ ...this.newProduct });
      alert('Thêm sản phẩm thành công!');
    }

    // reset form
    this.newProduct = { name: '', price: 0, quantity: 0, category: '', description: '', image: '' };
    this.editingIndex = null;

    // đóng modal
    this.addProductModal.closeModal();
  }

  editProduct(index: number) {
    this.editingIndex = index;
    this.newProduct = { ...this.products[index] };
    this.addProductModal.openModal();
    alert('sửa sản phẩm thành công!');
  }

  deleteProduct(index: number) {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này không?')) {
      this.products.splice(index, 1);
    }
  }
}
