import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import { CartService } from 'src/app/service/cart.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string = '';
  isLoggedIn: boolean = false;
  cartCount = 0;
  private sub?: Subscription;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.tokenService.getToken() != null;
    this.sub = this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
    if (this.isLoggedIn) {
      this.authService.getCurrentUserName().subscribe({
        next: (name: string) => this.userName = name,
        error: () => this.userName = 'Người dùng'
      });
    }
  }



  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.tokenService.removeToken();
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
      },
      error: () => {
        this.tokenService.removeToken();
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
      }
    });
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
