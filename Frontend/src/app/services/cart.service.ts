import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCartItems() {
    return this.http.get(this.apiUrl + '/cart/mycart');
  }

  addToCart(productId: number) {
    return this.http.post(`${this.apiUrl}/cart/${productId}`, {});
  }

  deleteCartItem(cartItemId: number) {
    return this.http.delete(`${this.apiUrl}/cart/${cartItemId}`);
  }
}
