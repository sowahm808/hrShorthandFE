import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-google-auth-callback',
  template: `<p>Redirecting...</p>`
})
export class GoogleAuthCallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const email = params['email'];
      const role = params['role']

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('role', role);  // Store role for future use

        // Redirect based on user role (stored in backend)
        if (role === 'admin') {  // Replace with actual admin check

        
          //this.router.navigate(['/admin/dashboard']);
          this.router.navigate(['/admin/questions'])
        } else {
          this.router.navigate(['/admin/dashboard']);
        }
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
