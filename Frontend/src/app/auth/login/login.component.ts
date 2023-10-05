import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }
  submit() {
    const emailValue = this.form.get('email')?.value;
    const passwordValue = this.form.get('password')?.value;

    this.authService
      .login({ email: emailValue, password: passwordValue })
      .subscribe(
        (response) => {
          const accessToken = response.accessToken;
          localStorage.setItem('accessToken', accessToken); // Store the token in localStorage

          this.userService.getUserProfile().subscribe((data: any) => {
            // this.user = data.user;
            console.log(data.user);
          });

          // Log the token to the console
          console.log('Access Token:', accessToken);
          // console.log('123')

          alert('Login successful');
          this.router.navigate(['/cart']); // Redirect to protected route
        },
        (error) => {
          alert('Login failed');
        }
      );
  }
}
