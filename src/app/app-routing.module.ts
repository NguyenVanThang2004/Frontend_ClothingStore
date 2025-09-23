import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutClientComponent } from './components/layout-client/layout-client.component';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { ShopingCartComponent } from './components/shoping-cart/shoping-cart.component';
import { BlogComponent } from './components/blog/blog.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { LayoutAdminComponent } from './components/admin/layout-admin/layout-admin.component';
import { ProductsComponent } from './components/admin/products/products.component';
import { SettingsComponent } from './components/admin/settings/settings.component';
import { UsersComponent } from './components/admin/users/users.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { ReportsComponent } from './components/admin/reports/reports.component';
import { ProfileComponent } from './components/profile/profile.component'
import { MyOrdersComponent } from './components/my-order/my-order.component';




const routes: Routes = [
  {
    path: '',
    component: LayoutClientComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'shoping-cart', component: ShopingCartComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'blog-detail', component: BlogDetailComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'product-detail/:id', component: ProductDetailComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'my-order', component: MyOrdersComponent }

    ]


  },
  {
    path: 'admin',
    component: LayoutAdminComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'users', component: UsersComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'reports', component: ReportsComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
