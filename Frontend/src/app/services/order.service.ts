import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  addOrder(orderData: any) {
    return this.http.post(this.apiUrl + '/orders/create', orderData);
  }
}
