import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  
  constructor() { }

  ngOnInit(): void {
    this.orders = [
      {
        id: 1234,
        totalPrice: 150.0,
        shippingAddress: '123 Main St, City',
        items: [
          { productName: 'Television', quantity: 1 },
          { productName: 'Earphone', quantity: 1 }
        ]
      },
      {
        id: 12,
        totalPrice: 200.0,
        shippingAddress: '456 Elm St, Town',
        items: [
          { productName: 'Handphone', quantity: 1 }
        ]
      }
    ];
  }
}

