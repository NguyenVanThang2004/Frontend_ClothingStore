import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { ProductImageService } from 'src/app/service/productImage.service';
import { ProductVariantService } from 'src/app/service/productVariant.service';
import { ProductDTO } from 'src/app/dtos/product';
import { ProductImageDTO } from 'src/app/dtos/productImage';
import { ProductVariantDTO } from 'src/app/dtos/productVariant';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  // ------------------------
  // Data state
  // ------------------------
  product!: ProductDTO;
  images: ProductImageDTO[] = [];
  variants: ProductVariantDTO[] = [];

  // ------------------------
  // Selection state
  // ------------------------
  sizes: string[] = [];
  colors: string[] = [];
  selectedSize: string = '';
  selectedColor: string = '';

  // ------------------------
  // Price & Quantity
  // ------------------------
  selectedPrice: number | null = null;
  quantity: number = 1;

  // ------------------------
  // Carousel config
  // ------------------------
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    infinite: true,
    autoplay: false,
    prevArrow:
      '<button class="slick-prev slick-arrow" aria-label="Previous" type="button"><i class="fa fa-chevron-left"></i></button>',
    nextArrow:
      '<button class="slick-next slick-arrow" aria-label="Next" type="button"><i class="fa fa-chevron-right"></i></button>'
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private productImageService: ProductImageService,
    private productVariantService: ProductVariantService,
    private toastr: ToastrService,
    private cartService: CartService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct(productId);
    this.loadImages(productId);
    this.loadVariants(productId);
  }

  // ------------------------
  // API calls
  // ------------------------
  private loadProduct(productId: number) {
    this.productService.getProductById(productId).subscribe({
      next: res => (this.product = res)
    });
  }

  private loadImages(productId: number) {
    this.productImageService.listImages(productId).subscribe({
      next: res => (this.images = res)
    });
  }

  private loadVariants(productId: number) {
    this.productVariantService.getVariantByProductId(productId).subscribe({
      next: res => {
        this.variants = res;
        this.sizes = [...new Set(this.variants.map(v => v.size))];
        this.colors = [...new Set(this.variants.map(v => v.color))];
      }
    });
  }

  // ------------------------
  // Availability checks
  // ------------------------
  isSizeAvailableForColor(size: string): boolean {
    if (!this.selectedColor) {
      return this.variants.some(v => v.size === size && v.stockQuantity > 0);
    }
    return this.variants.some(
      v =>
        v.size === size &&
        v.color === this.selectedColor &&
        v.stockQuantity > 0
    );
  }

  isColorAvailableForSize(color: string): boolean {
    if (!this.selectedSize) {
      return this.variants.some(v => v.color === color && v.stockQuantity > 0);
    }
    return this.variants.some(
      v =>
        v.color === color &&
        v.size === this.selectedSize &&
        v.stockQuantity > 0
    );
  }

  // ------------------------
  // Handlers
  // ------------------------
  selectSize(size: string) {
    if (this.selectedSize === size) {
      this.selectedSize = '';
    } else {
      this.selectedSize = size;
    }
    this.updatePrice();
  }

  selectColor(color: string) {
    if (this.selectedColor === color) {
      this.selectedColor = '';
    } else {
      this.selectedColor = color;
    }
    this.updatePrice();
  }


  private updatePrice() {
    if (this.selectedSize && this.selectedColor) {
      const variant = this.variants.find(
        v => v.size === this.selectedSize && v.color === this.selectedColor
      );
      this.selectedPrice = variant ? variant.price : null;
    } else {
      this.selectedPrice = null;
    }
  }

  increaseQty(): void {
    this.quantity++;
  }

  decreaseQty(): void {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart(): void {
    if (!this.selectedSize || !this.selectedColor) {
      this.toastr.warning('Vui lòng chọn Size và Màu sắc trước khi thêm vào giỏ!');
      return;
    }

    const variant = this.selectedVariant;
    if (!variant) {
      this.toastr.error('Biến thể sản phẩm không tồn tại!', 'Lỗi');
      return;
    }

    if (variant.stockQuantity <= 0) {
      this.toastr.error('Sản phẩm này đã hết hàng!', 'Thông báo');
      return;
    }

    const cartItem = {
      productId: this.product.id,
      variantId: variant.id,
      name: this.product.name,
      price: variant.price,
      size: this.selectedSize,
      color: this.selectedColor,
      quantity: this.quantity,
      image: this.images[0]?.url || ''
    };

    console.log('🛒 Add to Cart Item:', cartItem);
    this.cartService.addItem(cartItem);


    this.toastr.success('Đã thêm sản phẩm vào giỏ hàng!', 'Thành công');

    // 👉 điều hướng sang cart
    this.router.navigate(['/shoping-cart']);
  }


  get selectedVariant(): ProductVariantDTO | undefined {
    if (!this.selectedSize || !this.selectedColor) return undefined;
    return this.variants.find(
      v => v.size === this.selectedSize && v.color === this.selectedColor
    );
  }




}
