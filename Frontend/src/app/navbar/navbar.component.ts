import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { User, UserCredential } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isNotLoggedIn: boolean = false;
  user: User | null = null;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    this.userService.user$.subscribe((data) => {
      this.user = data
      this.isLoggedIn = this.authService.isLoggedIn();
      this.isNotLoggedIn = !this.authService.isLoggedIn();
    })
  }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((data: any) => {
    });
  }

  onLogout(): void {
    this.authService.removeToken();
    this.authService.removeUser();

    // mengembalikan user subject ke null
    this.userService.user.next(null)
    this.router.navigate(['/login']);
  }
}
