import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private toastr: ToastrService, private router: Router) {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.errorMessage = ''; // Clear any previous error message

    if (this.registrationForm.valid) {
      const user = this.registrationForm.value;
      user.role = 'member';

      this.authService.registerUser(user).subscribe(
        (response) => {
          // Handle successful registration
          console.log('Registration success:', response);
          this.toastr.success('Registration successful', 'Success')
          this.router.navigate(['/login']);
        },
        (error) => {
          // Handle registration error
          console.error('Registration error:', error);

          if (error.status === 400) {
            this.errorMessage = 'Email or name is already in use.';
          } else {
            this.errorMessage = 'An error occurred during registration. Please try again later.';
          }
        }
      );
    }
  }
}