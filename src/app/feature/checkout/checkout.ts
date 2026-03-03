
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../shared/components/input/input.component";
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout implements OnInit {
private readonly fb = inject(FormBuilder)
private readonly activatedRoute = inject(ActivatedRoute)
private readonly cartService = inject(CartService)

checkOutForm! : FormGroup
id : string | null =null
ngOnInit(): void {
  this.inint();
  this.getCardId()
}
inint():void{

  this.checkOutForm = this.fb.group({
    shippingAddress:this.fb.group({

details : [null , [Validators.required]],
city : [null , [Validators.required]],
phone : [null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]]



    })
  })



}

getCardId():void{
  this.activatedRoute.paramMap.subscribe({
    next:(urlParam)=>{
     this.id = urlParam.get('id')
    }
  })
}  


submitForm():void{
  if (this.checkOutForm.valid) {

this.cartService.checkoutSession(this.id , this.checkOutForm.value).subscribe({
  next:(res)=>{
    if (res.status === 'success') {
      window.open(res.session.url , '_self')
    }
    
  },error:(err)=>{
    console.log(err);
    
  }
})

  }
}


}
