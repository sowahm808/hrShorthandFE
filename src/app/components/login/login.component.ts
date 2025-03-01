import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    MatCardModule

  ]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      // Get CSRF Cookie first
      this.surveyService.getCsrfCookie().subscribe(() => {
        // Then proceed to login
        this.surveyService.login(this.loginForm.value).subscribe(response => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        }, error => {
          console.error('Login failed', error);
          alert('Invalid credentials. Please try again.');
        });
      });
    }
  }
  loginWithGoogle(): void {
    window.location.href = 'http://127.0.0.1:8000/auth/google';
  }
}
