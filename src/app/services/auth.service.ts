import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:5171';
  private authStatusSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public authStatus$ = this.authStatusSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  // Check if the user is logged in based on token presence
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Get the current auth status value
  get authStatus(): boolean {
    return this.authStatusSubject.value;
  }

  // Login method
  login(credentials: any): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/api/Auth/login`, credentials)
      .pipe(
        tap(response => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            this.authStatusSubject.next(true);
          }
        })
      );
  }

  // Register method
  register(user: User): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(
      `${this.url}/api/Auth/register`, 
      {
        username: user.username,
        password: user.password
      }
    );
  }

  // Logout method
  logout(): void {
    localStorage.removeItem('token');
    this.authStatusSubject.next(false);
    this.router.navigate(['/login']);
  }
}