import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private googleUrl ='http://127.0.0.1:8000/api'
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Get CSRF token for Laravel Sanctum
   */
 
  getCsrfCookie(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sanctum/csrf-cookie`, { withCredentials: true });
  }
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      }),
      withCredentials: true
    };
  }
  /**
   * Fetch survey questions
   */
  getSurveyQuestions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/survey`, {
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Submit survey responses
   */
  submitSurvey(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/survey`, data, {
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Fetch analytics for management dashboard
   */
  // getDashboardData(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/dashboard`, {
  //     withCredentials: true
  //   }).pipe(
  //     catchError(this.handleError)
  //   );
  // }
  getDashboardData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard`, this.getAuthHeaders()).pipe(
      catchError(this.handleError)
    );
  }
  /**
   * Retrieve rewards data for the current employee
   */
  getRewards(): Observable<any> {
    const employeeId = this.getEmployeeId();
    return this.http.get(`${this.apiUrl}/rewards/${employeeId}`, {
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Update rewards for a specific employee
   */
  updateRewards(employeeId: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/rewards/${employeeId}`, data, {
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }

  getPerks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/perks`, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { withCredentials: true }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.employee.role); // Store role in localStorage
        this.router.navigate([response.redirect_to]); // Navigate based on role
      }),
      catchError(this.handleError)
    );
  }
  
  /**
   * Logout method to end the current session
   */
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, {
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Register a new employee
   */
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data, {
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Fetch audit logs for management review
   */
  getAuditLogs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/audit-logs`, {
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }
  // Redirect to Google OAuth
  loginWithGoogle() {
    window.location.href = `${this.googleUrl}/auth/google`;  // Redirect the user to Google login
  }

  // Handle Google callback
  // handleGoogleCallback(code: string) {
  //   return this.http.get(`${this.googleUrl}/auth/google/callback?code=${code}`, {
  //     withCredentials: true // Ensures cookies are sent
  //   });
  // }
  handleGoogleCallback(code: string): Observable<any> {
    return this.http.get(`${this.googleUrl}/auth/google/callback?code=${code}`, { withCredentials: true }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.employee.role); // Store role
  
          // Redirect based on role
          const redirectPath = response.employee.role === 'admin' ? '/admin/dashboard' : '/user/dashboard';
          this.router.navigate([redirectPath]);
        } else {
          console.error('No token received');
        }
      }),
      catchError(this.handleError)
    );
  }
  

  /**
 * Add a new survey question
 */
addQuestion(questionData: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/questions`, questionData, {
    withCredentials: true
  }).pipe(
    catchError(this.handleError)
  );
}

/**
 * Update an existing survey question
 */
updateQuestion(questionId: number, questionData: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/questions/${questionId}`, questionData, {
    withCredentials: true
  }).pipe(
    catchError(this.handleError)
  );
}

/**
 * Delete a survey question
 */
deleteQuestion(questionId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/questions/${questionId}`, {
    withCredentials: true
  }).pipe(
    catchError(this.handleError)
  );
}


  /**
   * Helper method: Retrieve employee ID from localStorage (adjust as needed)
   */
  private getEmployeeId(): string {
    return localStorage.getItem('employee_id') || '';
  }

  /**
   * Handle HTTP Errors
   */
  private handleError(error: any) {
    console.error('Error occurred:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}
