import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.tokenService.getToken() != null;

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
}
