import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);

  countNumber: WritableSignal<number> = signal(0);

  addProductItemToCart(id: string): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'cart', {
      productId: id,
    });
  }

  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'cart');
  }

  removeCartItem(id: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + 'cart/' + id);
  }

  updateCount(id: string, count: number): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `cart/${id}`, {
      count: count,
    });
  }

  checkoutSession(id: string | null, data: object): Observable<any> {
    return this.httpClient.post(
      (environment.baseUrl = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`),
      data,
    );
  }

  getUserOrders(id: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `orders/user/${id}`);
  }

  getAllCategory(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'categories');
  }
  getAllbrands(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'brands');
  }
}
