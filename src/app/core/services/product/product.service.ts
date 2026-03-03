import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly httpclient = inject(HttpClient)

 getAllProducts(page:number = 1 ):Observable<any>{
return this.httpclient.get(environment.baseUrl+`products?page=${page}`)
 }


}

 