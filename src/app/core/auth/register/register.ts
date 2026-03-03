
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o";
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { InputComponent } from "../../../shared/components/input/input.component";
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CarouselModule, InputComponent],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit{
private readonly authService = inject(AuthService)
private readonly router = inject(Router)
private readonly fb = inject(FormBuilder)
subscribation : Subscription = new Subscription()
flag:boolean = false
msgError:string = ''
msgSuccess:string = ''
isLoading:boolean = false
// registerForm : FormGroup = new FormGroup({
// name: new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
// email: new FormControl(null , [Validators.required , Validators.email]),
// password: new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
// rePassword: new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
// phone: new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
// } , {validators: this.comfirmPassword});

registerForm! : FormGroup 

ngOnInit(): void {
  this.initForm()
}

initForm():void{
 this.registerForm = this.fb.group({
  name:[null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]],
  email:[null  , [Validators.required , Validators.email]],
  password:[null , [Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
  rePassword:[null , [Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
  phone:[null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]],
} , { validators: [this.comfirmPassword]  })
}

registerSlider: OwlOptions = {
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
    items: 1 ,
    nav: false
  }


comfirmPassword(group : AbstractControl){
 if (group.get('password')?.value === group.get('rePassword')?.value) {
  return   null 
 }else{
  return group.get('rePassword')?.setErrors({mismatch : true})
 }
}



  submitForm():void{

this.subscribation.unsubscribe()

  this.isLoading = true
    if(this.registerForm.valid){

   this.subscribation =    this.authService.registerForm(this.registerForm.value).subscribe({
next:(res)=>{
// navigate to login page
this.isLoading = false
this.msgError = ''
  this.msgSuccess = res.message
if(res.message === 'success'){
  
setTimeout(()=>{
  this.router.navigate(['./login'])
}, 2000)

}},error:(err)=>{
  this.msgSuccess = '' 
this.msgError = err.error.message
this.isLoading = false
}
       })
    }else{
      this.isLoading = false
      this.registerForm.markAllAsTouched()
      this.registerForm.get('rePassword')?.patchValue('')
    }

  }
}

