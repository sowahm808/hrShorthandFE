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
      const role = params['role'];
      const hasProfile = params['hasProfile'] === 'true'; // ✅ Ensure correct profile status

      console.log("Google Auth - Token:", token);
      console.log("Google Auth - Email:", email);
      console.log("Google Auth - Role:", role);
      console.log("Google Auth - Has Profile:", hasProfile);

      if (token) {
        // ✅ Store authentication details in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('role', role);
        localStorage.setItem('hasProfile', String(hasProfile)); // ✅ Store profile status as string

        // ✅ Use timeout to prevent instant navigation issues
        setTimeout(() => {
          const currentPath = window.location.pathname; // ✅ Get current URL path

          if (role === 'admin' && currentPath !== '/admin/dashboard') {
            console.warn("🚀 Redirecting Admin to Dashboard...");
            this.router.navigate(['/admin/dashboard']);
          } else if (role !== 'admin') {
            const targetPath = hasProfile ? '/user/survey' : '/user/onboarding';
            if (currentPath !== targetPath) {
              console.warn(`🚀 Redirecting User to ${targetPath}...`);
              this.router.navigate([targetPath]);
            }
          }
        }, 500); // ✅ Prevents navigation conflicts

        // ✅ Remove Google login params from URL to prevent looping
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        console.error("Google Auth Failed - No Token Found");
        this.router.navigate(['/login']); // 🚨 Redirect if authentication failed
      }
    });
  }
}
