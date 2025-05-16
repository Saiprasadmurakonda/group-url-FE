import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  user: User = new User();
  confirmPassword: string = '';
  passwordsMatch: boolean = true;
  confirmPasswordTouched: boolean = false;

  isLoading: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid && this.passwordsMatch) {
      this.isLoading = true;
      this.authService.register(this.user).subscribe(
        response => {
          console.log('Registration successful', response);
          alert('Registration successful');
          form.reset();
          this.router.navigate(['login']);
        },
        error => {
          this.isLoading = false;
          console.error('Registration failed', error);
          // Handle error response which now has a message property
          if (error.error && error.error.message) {
            alert(error.error.message);
          } else {
            alert('Registration failed. Please try again.');
          }
        }
      );
    }
  }

  checkPasswords() {
    this.passwordsMatch = this.user.password === this.confirmPassword;
    this.confirmPasswordTouched = true;
  }

  resetForm() {
    this.confirmPasswordTouched = false;
    this.passwordsMatch = true;
  }

  
}
