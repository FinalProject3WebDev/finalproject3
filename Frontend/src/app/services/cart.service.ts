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
}
