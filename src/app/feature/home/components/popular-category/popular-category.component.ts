
import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../../../core/services/category/category.service';

import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-popular-category',
  imports: [CarouselModule],
  templateUrl: './popular-category.component.html',
  styleUrl: './popular-category.component.scss',
})
export class PopularCategoryComponent implements OnInit {
private readonly categoryService = inject(CategoryService)

categories : Category[] = []

categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
       1100: {
        items: 6
      }
    },
    nav: false
  }

ngOnInit(): void {
  this.getAllCategoriesData()
}

getAllCategoriesData():void{
  this.categoryService.getAllCategory().subscribe({
    next: (res)=> {
      
      this.categories = res.data
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

}
