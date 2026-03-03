import { Subscription } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { AuthService } from '../service/auth.service';
import { InputComponent } from '../../../shared/components/input/input.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [
    CarouselModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    InputComponent,
    RouterLink,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly cookieService = inject(CookieService);
  subscription: Subscription = new Subscription();
  isLoading: boolean = false;
  msgError: string = '';
  msgSuccess: string = '';

  // loginform: FormGroup = new FormGroup({
  // email: new FormControl (null , [Validators.required , Validators.email]),
  // password: new FormControl (null , [Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)])

  // })

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          ),
        ],
      ],
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.subscription.unsubscribe();
      this.isLoading = true;
      this.msgError = '';
      this.subscription = this.authService.loginForm(this.loginForm.value).subscribe({
        next: (res) => {
          this.msgSuccess = res.message;
          this.isLoading = false;
          if (res.message === 'success') {
            this.cookieService.set('token', res.token);
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 2000);
          }
        },
        error: (err) => {
          this.msgError = err.error.message;
          this.isLoading = false;
        },
      });
    }
  }

  loginSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoWidth: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };
}
