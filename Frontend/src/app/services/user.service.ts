import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/profile`);
  }

  editUserProfile(user: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/profile/edit`, user);
  }
}
