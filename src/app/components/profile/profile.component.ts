import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/service/auth.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    user: any = {
        id: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        dateOfBirth: '',
        role: null
    };

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.authService.getCurrentUser().subscribe({
            next: (res) => {
                const id = res.data?.user?.id;   // 👈 lấy từ user
                if (id) {
                    this.userService.getUserByID(String(id)).subscribe({
                        next: (resUser) => {
                            this.user = resUser.data;  // BE /users/{id} trả full info
                        },
                        error: (err) => {
                            console.error(err);
                        }
                    });
                }
            },
            error: (err) => console.error(err)
        });
    }


    updateProfile(form: NgForm): void {
        if (form.invalid) {
            form.control.markAllAsTouched();
            return;
        }

        if (!this.user.id) {
            console.warn('User chưa có id, không thể cập nhật');
            return;
        }

        // Chỉ cho update 2 field: fullName + address
        const payload = {
            fullName: this.user.fullName,
            address: this.user.address
        };

        this.userService.updateUser(this.user.id, payload).subscribe({
            next: () => {
                this.toastr.success('Cập nhật thông tin thành công');
            },
            error: (err) => {
                console.error(err);
                this.toastr.error('Cập nhật thất bại');
            }
        });
    }
}
