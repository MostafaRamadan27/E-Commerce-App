import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CardComponent } from "../../shared/components/card/card.component";
import { ProductService } from '../../core/services/product/product.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-products',
  imports: [CardComponent , NgxPaginationModule , SearchPipe , FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
private readonly products = inject(ProductService)
private readonly cdr = inject(ChangeDetectorRef)
productList : product[]=[]
pageSize!:number 
p!:number 
total!:number 
isLoading: boolean =true

text:string = ''

ngOnInit(): void {
  this.getAllProductData()
  
}

getAllProductData(pageNumber : number = 1):void { 

  this.isLoading = true;

  this.products.getAllProducts(pageNumber).subscribe({
    next:(res)=>{
     this.productList = res.data;     
     this.pageSize = res.metadata.limit 
     this.p = res.metadata.currentPage 
     this.total = res.results
    
    },
    error:(err)=>{
      console.log(err);
       
    },complete:()=>{
      this.isLoading = false;
     this.cdr.detectChanges()
    } 
    })
    
  }
  
}
