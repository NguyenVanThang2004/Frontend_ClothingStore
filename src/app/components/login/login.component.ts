import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { LoginDTO } from 'src/app/dtos/user/login.dto';
import { TokenService } from 'src/app/service/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;

  email = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) { }

  onSubmit(form: NgForm) {
    this.errorMessage = '';

    if (form.invalid) {
      form.form.markAllAsTouched();
      return;
    }

    const payload: LoginDTO = {
      email: this.email.trim(),
      password: this.password
    };

    this.loading = true;

    this.authService.login(payload).subscribe({
      next: (res: any) => {
        this.loading = false;


        const token = res?.data?.access_token; // dùng trực tiếp
        if (token) {
          this.tokenService.setToken(token);
        }


        this.toastr.success('Đăng nhập thành công 🎉', 'Thông báo');
        this.router.navigate(['/admin']); // điều hướng trang admin
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage =
          err?.error?.message ||
          err?.error?.error ||
          err?.message ||
          'Đăng nhập thất bại. Vui lòng thử lại.';

        this.toastr.error(this.errorMessage, 'Lỗi');
      }
    });
  }
}
