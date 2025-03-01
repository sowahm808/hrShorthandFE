import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuthenticated = !!localStorage.getItem('token'); // Check if token is present

    if (isAuthenticated) {
      return true;
    } else {
      // Redirect to login page if not authenticated
      return this.router.createUrlTree(['/login']);
    }
  }
}
