import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FormsModule } from '@angular/forms';

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
import { LayoutAdminComponent } from './components/admin/layout-admin/layout-admin.component';
import { ProductsComponent } from './components/admin/products/products.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { UsersComponent } from './components/admin/users/users.component';
import { ReportsComponent } from './components/admin/reports/reports.component';
import { SettingsComponent } from './components/admin/settings/settings.component';
import { BaseModalComponent } from './shared/base-modal/base-modal.component';



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
    MainComponent,
    BlogDetailComponent,
    LayoutClientComponent,
    LayoutAdminComponent,
    ProductsComponent,
    OrdersComponent,
    UsersComponent,
    ReportsComponent,
    SettingsComponent,
    BaseModalComponent
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
