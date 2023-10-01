import { Component } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  products: Product[] = [];
  quantity: number = 1;
  faShoppingCart = faShoppingCart;
  
  constructor(private http: HttpClient, private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data: any) => {
      this.products = data;
      console.log(this.products)
    });
  }

  addToCart(productId: number) {
    const cartItem = {
      productId: productId,
      quantity: this.quantity
    };

    this.productService.addToCart(cartItem).subscribe((data: any) => {
      console.log(productId);
    });
  }
}
