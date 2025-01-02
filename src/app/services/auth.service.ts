// src/app/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/auth'; // Your backend API URL

  constructor(private http: HttpClient) {}

  // Sign-up API
  signup(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }

  // Login API
  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }


  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Check if the user is logged in (based on token existence)
  isLoggedIn(): boolean {
    return !!this.getToken();  // Check if token exists
  }

  // Logout API (for JWT-based logout)
  logout(): void {
    // Just remove token from localStorage/sessionStorage
    localStorage.removeItem('authToken');
  }

  // Get user details (if needed, using JWT token)
  getProfile(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/profile`, { headers });
  }
}
