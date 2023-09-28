import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  quantity: number = 1;
  
  constructor(private http: HttpClient, private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data: any) => {
      this.products = data;
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
