import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user!: User;

  constructor(private userService: UserService, private router: Router) { }
  
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((data: any) => {
      this.user = data.user;
    });
  }

  editProfile(): void {
    this.router.navigate(['/profile/edit']);
  }
}
