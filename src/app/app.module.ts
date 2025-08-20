import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SlickCarouselModule } from 'ngx-slick-carousel';


import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShopingCartComponent } from './shoping-cart/shoping-cart.component';


@NgModule({
  declarations: [

    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProductDetailComponent,
    ShopingCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule
  ],
  providers: [],
  bootstrap: [ShopingCartComponent]
})
export class AppModule { }
