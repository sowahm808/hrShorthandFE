// survey.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private apiUrl = 'http://your-backend-domain.com/api';

  constructor(private http: HttpClient) { }

  // Fetch survey questions
  getSurveyQuestions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/survey`);
  }

  // Submit survey responses
  submitSurvey(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/survey`, data);
  }

  // Fetch analytics for management dashboard
  getDashboardData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard`);
  }
}
