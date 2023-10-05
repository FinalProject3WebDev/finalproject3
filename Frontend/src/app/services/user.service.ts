import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Product } from '../interfaces/product';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000'

  user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable()

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/profile`)
    // pipe digunakan untuk mengambil data user setiap endpoint profile di panggil
    .pipe(
      map((data: any) => {
          this.user.next(data.user)
          return data
      })
    )
    ;
  }

  editUserProfile(user: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/profile/edit`, user);
  }
}
