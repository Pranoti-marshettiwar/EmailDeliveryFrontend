import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = 'http://localhost:5000/emails';

  constructor(private http: HttpClient) {}

  // sendEmail(email: string, subject: string, body: string): Observable<any> {
  //   return this.http.post(this.smtpEndpoint, {
  //     to: email,
  //     subject,
  //     body,
  //   });
  // }
  sendEmail(to: string, subject: string, body: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-email`, { to, subject, body });
  }

  queueEmails(emails: string[], subject: string, body: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/queue-emails`, { emails, subject, body });
  }

  updateMetrics(metrics: any): Observable<any> {
    return this.http.put('http://localhost:3000/campaignMetrics', metrics);
  }
}
