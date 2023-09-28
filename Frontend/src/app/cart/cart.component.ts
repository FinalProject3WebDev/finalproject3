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
          this.cartItems = []; 
        }
      },
      (error) => {
        console.error('Failed to get cart items', error);
      }
    );
  }

  checkout(): void {
    // json body to send to the backend
    const shippingAddress = '123 Main St, City';

    this.orderService.createOrder(shippingAddress).subscribe(
      (response: any) => {
        window.location.href = '/orders';
      },
      (error) => {
        console.error('Failed to create order', error);
      }
    );
   
  }
}
