import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsComponent {

  isShow: boolean = false;

  // lắng nghe scroll để show/hide button
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isShow = window.pageYOffset > 100;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
