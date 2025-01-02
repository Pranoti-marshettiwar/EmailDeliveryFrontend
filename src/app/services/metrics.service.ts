// src/app/services/metrics.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CampaignMetrics {
  emailsSent: number;
  emailsPending: number;
  emailsFailed: number;
}

@Injectable({
  providedIn: 'root'
})
export class MetricsService {
  private apiUrl = 'http://localhost:5000/campaignMetrics';

  constructor(private http: HttpClient) { }

  getMetrics(): Observable<CampaignMetrics> {
    return this.http.get<CampaignMetrics>(this.apiUrl);
  }

  updateMetrics(type: 'sent' | 'failed' | 'pending', count: number): Observable<CampaignMetrics> {
    return this.http.post<CampaignMetrics>(`${this.apiUrl}/update`, { type, count });
  }
   // Update specific metric
  //  updateMetrics(metric: 'emailsSent' | 'emailsPending' | 'emailsFailed', value: number): Observable<void> {
  //   return this.http.put<void>(this.apiUrl, { metric, value });
  // }
}
