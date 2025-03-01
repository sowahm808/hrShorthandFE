import { Routes } from '@angular/router';

// Import the new Onboarding component
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { LoginComponent } from './components/login/login.component';
import { DailySurveyComponent } from './components/daily-survey/daily-survey.component';
import { SurveySummaryComponent } from './components/survey-summary/survey-summary.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RewardsComponent } from './components/rewards/rewards.component';

// Import Auth Guard
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },  // New registration route
  { path: 'onboarding', component: OnboardingComponent, canActivate: [AuthGuard] },
  { path: 'survey', component: DailySurveyComponent, canActivate: [AuthGuard] },
  { path: 'survey-summary', component: SurveySummaryComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'rewards', component: RewardsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
