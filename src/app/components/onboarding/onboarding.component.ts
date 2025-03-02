import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule
  ]
})
export class OnboardingComponent implements OnInit{

  constructor(private router: Router) {}

  ngOnInit(): void {
    const hasProfile = localStorage.getItem('hasProfile') === 'true';

    if (hasProfile) {
      // 🛑 If user already has a profile, skip onboarding and go to survey
      this.router.navigate(['/user/survey']);
    }
  }
  startSurvey(): void {
    // ✅ Mark onboarding as complete
    localStorage.setItem('hasProfile', 'true');

    // 🚀 Redirect user to the survey
    this.router.navigate(['/user/survey']);
  }
}
