import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginError: string = '';
  
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  
  isLoading: boolean = false;
  constructor(private service:AuthService, private router:Router) { }
  
  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.service.login(this.loginForm.value).subscribe((res:any) => {
        if (res) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['home']);
        } else {
          // alert('Invalid credentials');
          this.loginError = 'Invalid credentials';
          this.isLoading = false;
        }
      }, err => {
        // alert('Invalid credentials');
        this.loginError = 'Invalid credentials';
        this.isLoading = false;
      });
    } 
    else {
      alert('Please fill in all fields');
    }
  }

}
