// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Import AuthService

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';  // To store any error messages

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize the form with validation rules
    this.loginForm = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.minLength(3)] // Minimum 3 characters
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(6)] // Minimum 6 characters
      ]
    });
  }

  // Getter for easy access to form controls
  get f() {
    return this.loginForm.controls;
  }

  // Method to handle login submission
  onLogin(): void {
    if (this.loginForm.invalid) {
      return; // If form is invalid, don't proceed
    }

    const { username, password } = this.loginForm.value;

    // Call login service method
    this.authService.login({ username, password }).subscribe(
      (res) => {
        console.log(res);  // In a real-world scenario, handle this better
        // Store the token in localStorage
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);  // Navigate to the dashboard or another page
      },
      (err) => {
        console.error(err);
        this.errorMessage = err.error.msg || 'Invalid credentials';
      }
    );
  }
}
