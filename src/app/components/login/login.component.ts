// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { Router, RouterLink } from '@angular/router';
// import { SurveyService } from '../../services/survey.service';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { CommonModule } from '@angular/common';
// import { MatCardModule } from '@angular/material/card';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss'],
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     MatInputModule,
//     MatButtonModule,
//     RouterLink,
//     MatCardModule

//   ]
// })
// export class LoginComponent implements OnInit{
//   loginForm: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private surveyService: SurveyService,
//     private router: Router
//   ) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     });
//   }

//   ngOnInit(): void {
//     const token = localStorage.getItem('token');
//     if (token) {
//       this.router.navigate(['/dashboard']);
//     }
//   }
  

//   onSubmit(): void {
//     if (this.loginForm.valid) {
//       // Get CSRF Cookie first
//       this.surveyService.getCsrfCookie().subscribe(() => {
//         // Then proceed to login
//         this.surveyService.login(this.loginForm.value).subscribe(response => {
//           localStorage.setItem('token', response.token);
//           localStorage.setItem('role', response.employee.role); // Store role in localStorage
//           this.router.navigate(['/dashboard']);
//         }, error => {
//           console.error('Login failed', error);
//           alert('Invalid credentials. Please try again.');
//         });
//       });
//     }
//   }


//   loginWithGoogle() {
//     //this.surveyService.loginWithGoogle(); // Redirects to Google login
//     window.location.href = 'http://127.0.0.1:8000/api/auth/google';

//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { environment } from '../../../environments/environment';

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
export class LoginComponent implements OnInit {
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

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.redirectUser();
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      // Get CSRF Cookie first
      this.surveyService.getCsrfCookie().subscribe(() => {
        // Then proceed to login
        this.surveyService.login(this.loginForm.value).subscribe(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.employee.role); // Store role
          localStorage.setItem('hasProfile', response.employee.hasProfile); // Store profile status

          this.redirectUser();
        }, error => {
          console.error('Login failed', error);
          alert('Invalid credentials. Please try again.');
        });
      });
    }
  }

  loginWithGoogle() {
    window.location.href = `${environment.apiUrl}/auth/google`;
  }

  /** 🔹 Redirects user based on profile status */
  private redirectUser(): void {
    const hasProfile = localStorage.getItem('hasProfile') === 'true';

    if (hasProfile) {
      this.router.navigate(['/user/survey']); // If profile exists, go to survey
    } else {
      this.router.navigate(['/user/onboarding']); // Otherwise, go to onboarding
    }
  }
}
