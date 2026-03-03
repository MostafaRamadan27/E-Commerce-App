import { Component, inject, Input, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NgxSkeletonLoaderComponent } from "ngx-skeleton-loader";
import { CartService } from '../../../feature/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-card',
  imports: [RouterLink, NgxSkeletonLoaderComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)


@Input()  Loading :boolean = false
@Input() product : product = {} as product


addProductToCart(id:string):void{
  this.cartService.addProductItemToCart(id).subscribe({
    next:(res)=>{
      console.log(res);
      
     this.toastrService.success(res.message)
     this.cartService.countNumber.set(res.numOfCartItems)
    },error:(err)=>{
      console.log(err);
      
    }
  })
}


}
