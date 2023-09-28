import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  createOrder(shippingAddress: string) {
    return this.http.post(`${this.apiUrl}/order/create`, shippingAddress);
  }

  getOrders() {
    return this.http.get(`${this.apiUrl}/order/history`);
  }

}
