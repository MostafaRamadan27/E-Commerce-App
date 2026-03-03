import { CurrencyPipe } from '@angular/common';

import { CookieService } from 'ngx-cookie-service';
import { CartService } from './../cart/services/cart.service';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';

import { AuthService } from '../../core/auth/service/auth.service';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent implements OnInit  {
private readonly cartService = inject(CartService)

private readonly cd = inject(ChangeDetectorRef)
private readonly authService = inject(AuthService)

token : any 
id : string = ''
userOrder : Userorder[] = []
ngOnInit(): void {
  // this.getUserOrders()
this.decodeToken()
 this.getUserOrders()
}

decodeToken():void{
     this.token = this.authService.decodeToken()
     this.id = this.token.id;
}


getUserOrders():void{
  this.cartService.getUserOrders(this.id).subscribe({
    next:(res)=>{
     console.log(res);
     this.userOrder = res
     this.cd.detectChanges()
     
    },error:(err)=>{
    console.log(err);
    
    }
  })
}



}
