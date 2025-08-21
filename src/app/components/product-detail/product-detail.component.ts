import { Component } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  slides = [
    { img: '/assets/images/product-detail-01.jpg' },
    { img: '/assets/images/product-detail-02.jpg' },
    { img: '/assets/images/product-detail-03.jpg' }
  ];

  slides2 = [
    { img: '/assets/images/testao.jpeg' },
    { img: '/assets/images/testao.jpeg' },
    { img: '/assets/images/testao.jpeg' }
  ];

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    infinite: true,
    autoplay: false
  };

}
