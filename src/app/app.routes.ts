import { Routes } from '@angular/router';

// Public Components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

// Authenticated User Components
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { DailySurveyComponent } from './components/daily-survey/daily-survey.component';
import { SurveySummaryComponent } from './components/survey-summary/survey-summary.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RewardsComponent } from './components/rewards/rewards.component';

// Admin Components
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { QuestionManagementComponent } from './components/question-management/question-management.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { GoogleAuthCallbackComponent } from './components/auth/google-auth-callback/google-auth-callback.component';

export const routes: Routes = [
  /*** 🔹 Public Routes ***/
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  /*** 🔹 User Routes (Authenticated Only) ***/
  {
    path: 'user',
    canActivate: [AuthGuard],
    children: [
      { path: 'onboarding', component: OnboardingComponent },
      { path: 'survey', component: DailySurveyComponent },
      { path: 'survey-summary', component: SurveySummaryComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'rewards', component: RewardsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  /*** 🔹 Admin Routes (Restricted to Admins Only) ***/
  {
    path: 'admin',
    //canActivate: [AuthGuard, AdminGuard],
    canActivate: [AuthGuard],

    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'questions', component: QuestionManagementComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: 'auth/google/callback', component: GoogleAuthCallbackComponent },

  /*** 🔹 Default Redirects ***/
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
