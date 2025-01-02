import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CsvUploadComponent } from '../csv-upload/csv-upload.component';
import { TemplateEditorComponent } from '../template-editor/template-editor.component';
import { EmailCampaignComponent } from '../email-campaign/email-campaign.component';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';
import { CampaignMetrics, MetricsService } from '../services/metrics.service';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: true,
    imports: [CsvUploadComponent, TemplateEditorComponent,EmailCampaignComponent],
})
export class DashboardComponent implements OnInit {
  metrics: CampaignMetrics = {
    emailsSent: 0,
    emailsPending: 0,
    emailsFailed: 0,
  };

  private apiUrl = 'http://localhost:3000/campaignMetrics';
  constructor(private router: Router,private http: HttpClient,private metricsService: MetricsService) {}
  ngOnInit(): void {
    // Fetch metrics initially
    this.fetchMetrics();

    // Periodically refresh metrics every 5 seconds
    setInterval(() => this.fetchMetrics(), 5000);
  }

  // Logout function to redirect to login page
  logout(): void {
    // Here you might want to clear any user-related data or tokens.
    // For example, clearing localStorage or sessionStorage
    localStorage.removeItem('token'); // Clear the token
    this.router.navigate(['/login']); // Navigate to the login page
  }

  fetchMetrics(): void {
    this.metricsService.getMetrics().subscribe(
      (data) => {
        this.metrics = data;
       // this.updateChart();
      },
      (error) => {
        console.error('Error fetching metrics:', error);
      }
    );
  }
  updateMetrics(metric: 'emailsSent' | 'emailsPending' | 'emailsFailed', value: number): void {
    const updatedMetrics = { ...this.metrics, [metric]: this.metrics[metric] + value };

    this.http.put(this.apiUrl, updatedMetrics).subscribe({
      next: () => {
        this.fetchMetrics(); // Refresh after updating
      },
      error: (err) => {
        console.error('Error updating metrics:', err);
      }
    });
  }
}
