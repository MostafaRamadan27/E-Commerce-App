
import { ChangeDetectorRef, Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product/product.service';
import { log } from 'console';
import { SlicePipe } from '@angular/common';
import { ProductDetailsService } from './sevices/product-details.service';
import { CartService } from '../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl:'./details.html',
  styleUrl: './details.scss',
})
export class Details implements OnInit  {
private readonly activatedRoute = inject(ActivatedRoute)
private readonly productDetailsService = inject(ProductDetailsService)
private readonly cdr = inject(ChangeDetectorRef)
private readonly cartService = inject(CartService)
 private readonly toastrService = inject(ToastrService)
productId : string | null = null;
productDetails : product = {} as product;
selectImg : string = '';



ngOnInit(): void {
  this.getProductId();
  this.getPeoductDetails();
  // this.selectImg = this.productDetails.images?.[0] || '';
}

getProductId():void {
  this.activatedRoute.paramMap.subscribe({
    next:(urlParams)=>{
     this.productId = urlParams.get('id');
    }
  })
}
changeImg(imgSrc : string){
console.log(imgSrc);
this.selectImg = imgSrc;
}

getPeoductDetails():void{
  this.productDetailsService.getProductById(this.productId!).subscribe({
    next : (res)=>{
      this.productDetails = res.data; 
 
    },
    error:(err)=>{
      console.log(err); 
  },complete:()=>{
        this.cdr.detectChanges()
  }
  })
}

addProductToCart(id:string):void{
  this.cartService.addProductItemToCart(id).subscribe({
    next:(res)=>{
 this.toastrService.success(res.message)
 this.cartService.countNumber.set(res.numOfCartItems)

    },error:(err)=>{
console.log(err);

    }

  })
}

}
