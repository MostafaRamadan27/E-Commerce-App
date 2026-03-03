import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../cart/services/cart.service';
import { ICategory } from '../../core/models/category.interface';

@Component({
  selector: 'app-category',
  imports: [],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class Category implements OnInit {
  private readonly cartService = inject(CartService);

  categoryData: ICategory[] = [];

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory(): void {
    this.cartService.getAllCategory().subscribe({
      next: (res) => {
        this.categoryData = res.data;
        console.log(this.categoryData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
