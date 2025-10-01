import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userName = '';
  isLoggedIn = false;
  cartCount = 0;

  private subs = new Subscription();

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //  Lắng nghe login/logout để cập nhật header ngay
    this.subs.add(
      this.authService.loggedIn$.subscribe(isLogged => {
        this.isLoggedIn = isLogged;
        if (isLogged) {
          this.authService.getCurrentUserName().subscribe({
            next: (name: string) => this.userName = name || 'Người dùng',
            error: () => this.userName = 'Người dùng'
          });
        } else {
          this.userName = '';
        }
      })
    );

    // Giỏ hàng
    this.subs.add(
      this.cartService.cartCount$.subscribe(count => this.cartCount = count)
    );
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.setLogout();
        this.router.navigate(['/login']);
      },
      error: () => {
        this.authService.setLogout();
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
