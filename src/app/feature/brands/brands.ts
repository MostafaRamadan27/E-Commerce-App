import { IBrands } from './../../core/models/brands.interface';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.html',
  styleUrl: './brands.scss',
})
export class Brands implements OnInit {
  private readonly cartService = inject(CartService);

  brandsData: IBrands[] = [];

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands(): void {
    this.cartService.getAllbrands().subscribe({
      next: (res) => {
        this.brandsData = res.data;
        console.log(this.brandsData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
