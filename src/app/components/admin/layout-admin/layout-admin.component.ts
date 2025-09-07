import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';


@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.css']
})
export class LayoutAdminComponent implements OnInit {


  userName: string = '';

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.authService.getCurrentUserName().subscribe({
      next: (name: string) => this.userName = name,
      error: () => this.userName = 'Người dùng'
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.tokenService.removeToken(); // xóa access_token ở localStorage
        this.router.navigate(['/']); // điều hướng về trang login
      },
      error: () => {
        console.log('loi logout');
        this.tokenService.removeToken();
        this.router.navigate(['/']);
      }
    });
  }


}
