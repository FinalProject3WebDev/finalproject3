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
  shippingCost = 10; 

  constructor(private cartService: CartService, private orderService: OrderService) { }

  ngOnInit(): void {
    // display cart items
    this.cartService.getCartItems().subscribe(
      response => {
        this.cartItems = response as any[];
      },
      error => {
        console.error('Failed to fetch cart items', error);
      }
    );
  }

  calculateSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.totalPrice * item.quantity), 0);
  }

  calculateTotal(): number {
    return this.calculateSubtotal() + this.shippingCost;
  }

  changeAddress(): void {

  }

  checkout(): void {
    // json body to send to the backend
    const orderData = {
      cartItems: this.cartItems,
      shippingAddress: 'Jalan Ganesha No.10 Bandung, Jawa Barat 19234',
      totalPrice: this.calculateTotal()
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
