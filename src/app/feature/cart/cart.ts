import {  ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { ICart } from './models/cart.interface';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit {
private readonly cartService = inject(CartService)
private readonly cd = inject(ChangeDetectorRef)
private readonly toastr = inject(ToastrService)
 
cartDetails : ICart = {} as ICart

ngOnInit(): void {
  this.getLoggedUserData()
}

getLoggedUserData():void{

this.cartService.getLoggedUserCart().subscribe({
  next:(res)=>{
  
    
this.cartDetails = res.data 

this.cd.detectChanges()
  },error:(err)=>{
  console.log(err);
  
  }
})

}

deleteCartItem(id:string):void{
  this.cartService.removeCartItem(id).subscribe({
    next:(res)=>{
      this.cartService.countNumber.set(res.numOfCartItems) 
      this.toastr.warning(res.status)
      this.cartDetails = res.data
      this.cd.detectChanges()
    },error:(err)=>{
console.log(err);

    }
  })
}

updateCount(id:string , count:number):void{
  this.cartService.updateCount(id , count).subscribe({
    next:(res)=>{
      this.cartDetails = res.data 
      this.cd.detectChanges()
    },error:(err)=>{
console.log(err);
    }
  })
}

}
