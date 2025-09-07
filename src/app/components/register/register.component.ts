import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;

  fullname = '';
  phonenumber = '';
  email = '';
  password = '';

  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  onSubmit(form: NgForm) {
    this.errorMessage = '';

    if (form.invalid) {
      form.form.markAllAsTouched();
      return;
    }

    const payload = {
      fullName: this.fullname.trim(),
      phoneNumber: this.phonenumber.trim(),
      email: this.email.trim(),
      password: this.password
    };

    this.loading = true;

    this.authService.register(payload).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success('Đăng ký thành công 🎉', 'Thông báo');
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage =
          err?.error?.message ||
          err?.error?.error ||
          err?.message ||
          'Đăng ký thất bại. Vui lòng thử lại.';
      }
    });
  }
}
