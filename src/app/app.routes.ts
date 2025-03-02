import { SystemSettingsComponent } from './components/system-settings/system-settings.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
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
import { PerksComponent } from './components/perks/perks.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';

// Admin Components
import { MainLayoutComponent } from './components/main-layout/main-layout.component'; // 🆕 New Layout Wrapper
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { QuestionManagementComponent } from './components/question-management/question-management.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { GoogleAuthCallbackComponent } from './components/auth/google-auth-callback/google-auth-callback.component';
import { ReportsComponent } from './components/reports/reports.component';

export const routes: Routes = [
  /*** 🔹 Public Routes ***/
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'auth/google/callback', component: GoogleAuthCallbackComponent },

  /*** 🔹 User Routes (Authenticated Only) ***/
  {
    path: 'user',
    component: MainLayoutComponent, // ✅ Wraps all admin pages

    //canActivate: [AuthGuard],
    children: [
      { path: 'onboarding', component: OnboardingComponent },
      { path: 'survey', component: DailySurveyComponent },
      { path: 'dashboard', component: DashboardComponent }, // ✅ Fixed Missing Dashboard
      { path: 'rewards', component: RewardsComponent },
      { path: 'perks', component: PerksComponent },
      { path: 'thank-you', component: ThankYouComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // ✅ Default to Dashboard
    ],
  },

  /*** 🔹 Admin Routes (Persistent Sidenav) ***/
  {
    path: 'admin',
    component: MainLayoutComponent, // ✅ Wraps all admin pages
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: 'dashboard', component: AdminDashboardComponent }, // ✅ Corrected
      { path: 'questions', component: QuestionManagementComponent },
      { path: 'survey-summary', component: SurveySummaryComponent },
      { path: 'user-management', component: UserManagementComponent},
      { path: 'reports', component: ReportsComponent},
      { path: 'settings', component: SystemSettingsComponent},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // ✅ Default to Admin Dashboard
    ],
  },

  /*** 🔹 Default Redirects ***/
  { path: '', component: LoginComponent }, // ✅ Prevent Infinite Redirects
  { path: '**', redirectTo: '/login' }, // ✅ Catch-all route
];
