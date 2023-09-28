import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  
  constructor(private http: HttpClient, private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((data: any) => {
      this.orders = data;
    });
  }
}

