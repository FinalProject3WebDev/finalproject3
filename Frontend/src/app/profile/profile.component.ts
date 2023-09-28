import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user!: User;

  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((data: any) => {
      this.user = data.user;
    });
  }
}
