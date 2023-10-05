import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: User | null = null;

  constructor(private userService: UserService, private router: Router) {
    // disini ngambil langsung dari user subject yang ada di userservice
    this.userService.user$.subscribe((data) => {
      this.user = data
    })
  }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((data: any) => {
      // this.user = data.user;

    });
  }

  editProfile(): void {
    this.router.navigate(['/profile/edit']);
  }
}
