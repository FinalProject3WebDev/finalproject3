import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = []; 
  totalPrice = 0;
  shippingCost = 10; 

  constructor(private cartService: CartService, private orderService: OrderService) { }

  ngOnInit(): void {
    // display cart items
    this.cartService.getCartItems().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.cartItems)) {
          this.cartItems = response.cartItems;
          this.totalPrice = response.totalPrice;
        } else {
          this.cartItems = []; // Set it to an empty array if the response is not as expected
        }
      },
      (error) => {
        console.error('Failed to get cart items', error);
      }
    );
  }

  checkout(): void {
    // json body to send to the backend
    const orderData = {
      cartItems: this.cartItems,
      shippingAddress: 'Jalan Ganesha No.10 Bandung, Jawa Barat 19234',
    };

    // add order
    this.orderService.addOrder(orderData).subscribe(
      response => {
        console.log('Order added successfully', response);

      },
      error => {
        console.error('Failed to add the order', error);
      }
    );
  }
}
