import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`)
  }

  getProductsByCategory(categoryId: number) {
    return this.http.get<Product[]>(`${this.baseUrl}/products?categoryId=${categoryId}`);
  }

  createProduct(params: {
    categoryId: number,
    productName: string,
    productDescription: string,
    price: number,
    stock: number,
    productImage: string,
}) {
    const url = `${this.baseUrl}/products`;
    return this.http.post(url, params);
  }

  deleteProduct(productId: string|number) {
    const url = `${this.baseUrl}/products/${productId}`;
    return this.http.delete(url);
  }

  editProduct(productId: string|number, params: {
    productName: string,
    productDescription: string,
    price: any,
    stock: any,
  }) {
    console.log(params);

    const url = `${this.baseUrl}/products/${productId}`;
    return this.http.put(url, params);
  }

  // add to cart by getting the product id
  addToCart(cartItem: { productId: number, quantity: number }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/cart/${cartItem.productId}`, { quantity: cartItem.quantity });
  }
}
