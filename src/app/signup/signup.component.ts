// src/app/signup/signup.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    standalone: false
})
export class SignupComponent {
  signupForm: FormGroup;  // FormGroup to handle form validation
  errorMessage: string = ''; // To store any error messages

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Initialize the form with validation rules
    this.signupForm = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.minLength(3)] // Minimum 3 characters
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(6)] // Minimum 6 characters
      ],
      confirmPassword: [
        '',
        [Validators.required, Validators.minLength(6)] // Minimum 6 characters
      ],
    });
  }

  // Getter for easy access to form controls
  get f() {
    return this.signupForm.controls;
  }

  // Signup method to submit the form data
  onSignup(): void {
    if (this.signupForm.invalid) {
      return; // If form is invalid, don't proceed
    }

    const { username, password, confirmPassword } = this.signupForm.value;

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    const user = { username, password };

    this.authService.signup(user).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/login']); // Navigate to login after successful signup
      },
      (err) => {
        console.error(err);
        this.errorMessage = err.error.msg || 'An error occurred while signing up!';
      }
    );
  }
}
