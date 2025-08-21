import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  slides = [
    { img: "/assets/images/slide-03.jpg" },
    { img: "/assets/images/slide-02.jpg" },
    { img: "/assets/images/slide-01.jpg" }
  ];

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    arrows: true,     // nếu muốn tắt thì để false
    autoplay: true,   // tự động chạy
    autoplaySpeed: 500
  };
}
