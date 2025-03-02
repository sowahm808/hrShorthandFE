import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SurveyService } from '../services/survey.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private surveyService: SurveyService, private router: Router) {}

  canActivate(): boolean {
    const role = localStorage.getItem('role'); // Adjust this based on how roles are handled
    if (role === 'admin') {
      return true;
    }else{
      this.router.navigate(['/dashboard']); // Redirect non-admins to dashboard
      return false;
    }
  
  }}
