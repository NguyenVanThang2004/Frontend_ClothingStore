import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FormsModule } from '@angular/forms'; // 👈 import thêm cái này

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ShopingCartComponent } from './components/shoping-cart/shoping-cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ShopComponent } from './components/shop/shop.component';
import { BlogComponent } from './components/blog/blog.component';
import { LayoutClientComponent } from './components/layout-client/layout-client.component';
import { MainComponent } from './main/main.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';



@NgModule({
  declarations: [

    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProductDetailComponent,
    ShopingCartComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    ShopComponent,
    BlogComponent,
    LayoutClientComponent,
    MainComponent,
    BlogDetailComponent,
    LayoutClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
