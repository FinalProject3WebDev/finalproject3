import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductCategory } from '../interfaces/productCategory';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private baseUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getCategories(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(`${this.baseUrl}/categories`)
  }
}
