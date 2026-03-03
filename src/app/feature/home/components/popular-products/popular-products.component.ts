
import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../../../shared/components/card/card.component";
import { ProductService } from '../../../../core/services/product/product.service';


@Component({
  selector: 'app-popular-products',
  imports: [CardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.scss',
})
export class PopularProductsComponent implements OnInit {
private readonly products = inject(ProductService)
productList : product[] = []

ngOnInit(): void {
  this.getAllProductData()
}

getAllProductData():void {
  this.products.getAllProducts().subscribe({
    next:(res)=>{
this.productList = res.data;      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

}
