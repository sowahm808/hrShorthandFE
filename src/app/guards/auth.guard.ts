import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    const hasProfile = localStorage.getItem('hasProfile') === 'true'; //  Check if user has completed onboarding
    const role = localStorage.getItem('role'); // Get user role (admin or user)
    const currentUrl = state.url; //  Current attempted route

    console.log("AuthGuard - Token:", token);
    console.log("AuthGuard - Has Profile:", hasProfile);
    console.log("AuthGuard - Role:", role);
    console.log("AuthGuard - Attempted Route:", currentUrl);
    console.log("AuthGuard - Current Path:", window.location.pathname);

    //  If no token, redirect to login (only if not already there)
    if (!token) {
      if (window.location.pathname !== '/login') {
        console.warn(" No token found! Redirecting to login...");
        //this.safeNavigate('/login');
      }
      return false;
    }

    //  If user is not onboarded and is NOT an admin, redirect to onboarding
    if (!hasProfile && role !== 'admin') {
      if (window.location.pathname !== '/user/onboarding') {
        console.warn(" User has no profile! Redirecting to onboarding...");
        //this.safeNavigate('/user/onboarding');
      }
      return false;
    }

    // User is authenticated, allow access
    console.log(" AuthGuard - Access Granted!");
    return true;
  }

  /**
   *  Prevents infinite loop by ensuring navigation happens AFTER execution
   */
  private safeNavigate(url: string): void {
    setTimeout(() => {
      if (window.location.pathname !== url) {
        this.router.navigate([url]);
      }
    }, 0);
  }
}
