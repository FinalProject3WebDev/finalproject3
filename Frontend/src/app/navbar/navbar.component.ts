import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { UserCredential } from '../interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isNotLoggedIn: boolean = false;
  user: UserCredential = {};

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isNotLoggedIn = !this.authService.isLoggedIn();
    this.user = JSON.parse(this.authService.getUser() as string);
  }

  onLogout(): void {
    this.authService.removeToken();
    this.authService.removeUser();
    this.router.navigate(['/login']);
  }
}
