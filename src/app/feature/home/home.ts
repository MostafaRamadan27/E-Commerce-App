import { Component } from '@angular/core';
import { MainSliderComponent } from "./components/main-slider/main-slider.component";
import { PopularCategoryComponent } from "./components/popular-category/popular-category.component";
import { PopularProductsComponent } from "./components/popular-products/popular-products.component";



@Component({
  selector: 'app-home',
  imports: [ MainSliderComponent, PopularCategoryComponent, PopularProductsComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {



}
