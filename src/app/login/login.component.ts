import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  private authService!: AuthService
  private router!: Router 
  loginForm!: FormGroup;  

  constructor(private formBuilder: FormBuilder,  authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')!.value;
      const password = this.loginForm.get('password')!.value;
      this.authService.login(username, password).subscribe({
        next: (data) => {
            localStorage.setItem('token', data.token);
            this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          alert('Login failed: ' + error.message);
        }
    });
    }
  }
}
