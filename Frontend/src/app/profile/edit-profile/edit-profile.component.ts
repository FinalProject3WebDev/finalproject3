import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editedUser: any = {};

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (data) => {
        this.editedUser = data.user;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit(): void {
    this.userService.editUserProfile(this.editedUser).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
