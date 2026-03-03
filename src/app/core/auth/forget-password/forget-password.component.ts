import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input.component';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly cd = inject(ChangeDetectorRef);
  private readonly authService = inject(AuthService);
  private readonly toastr = inject(ToastrService);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);
  verifyEmail!: FormGroup;
  verifyCode!: FormGroup;
  ResetPassword!: FormGroup;
  step: number = 1;
  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    ((this.verifyEmail = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    })),
      (this.verifyCode = this.fb.group({
        resetCode: [null, Validators.required],
      })),
      (this.ResetPassword = this.fb.group({
        email: [null, [Validators.required, Validators.email]],
        newPassword: [
          null,
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            ),
          ],
        ],
      })));
  }

  forgotPassword(): void {
    if (this.verifyEmail.valid) {
      this.authService
        .forgetPassword(this.verifyEmail.value)
        .pipe(
          finalize(() => {
            this.cd.detectChanges();
          }),
        )
        .subscribe({
          next: (res) => {
            if (res.statusMsg === 'success') {
              this.toastr.show(res.message);
              this.step = 2;
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  confirmCode(): void {
    if (this.verifyCode.valid) {
      this.authService
        .verifyCode(this.verifyCode.value)
        .pipe(
          finalize(() => {
            this.cd.detectChanges();
          }),
        )
        .subscribe({
          next: (res) => {
            this.step = 3;
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  resetPassword(): void {
    this.authService
      .submitResetPassword(this.ResetPassword.value)
      .pipe(
        finalize(() => {
          this.cd.detectChanges();
        }),
      )
      .subscribe({
        next: (res) => {
          this.cookieService.set('token', res.token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
