import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  /**
   * Get CSRF token for Laravel Sanctum
   */
 
  getCsrfCookie(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sanctum/csrf-cookie`, { withCredentials: true });
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
  getDashboardData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard`, {
      withCredentials: true
    }).pipe(
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

  /**
   * Login method to authenticate an employee
   */
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, {
      withCredentials: true
    }).pipe(
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
