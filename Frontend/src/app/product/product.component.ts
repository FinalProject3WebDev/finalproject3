import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('/api/products').subscribe((data: any) => {
      this.products = data;
    });
  }
}
