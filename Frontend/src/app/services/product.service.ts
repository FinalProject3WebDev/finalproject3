import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`)
  }

  getProductsByCategory(categoryId: string) {
    const url = `${this.baseUrl}?categoryId=${categoryId}`;
    return this.http.get(url);
  }

  // add to cart by getting the product id
  addToCart(cartItem: { productId: number, quantity: number }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/cart/${cartItem.productId}`, { quantity: cartItem.quantity });
  }
}
