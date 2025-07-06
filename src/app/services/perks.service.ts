import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerksService {
  private apiUrl = `${environment.apiUrl}/perks`;  // Your Laravel endpoint

  constructor(private http: HttpClient) { }

  getPerks(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Perks Service Error:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}
