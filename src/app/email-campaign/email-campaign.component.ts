import { Component, Input, input } from '@angular/core';
import { EmailService } from '../services/email.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MetricsService } from '../services/metrics.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-email-campaign',
  templateUrl: './email-campaign.component.html',
  styleUrls: ['./email-campaign.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule,MatSnackBarModule]
})
export class EmailCampaignComponent {
  @Input() emailData: any;
  emails: any[] = [];
  emailTemplate: string = '';
  statusMessages: string[] = [];
  queueMails: string[] = [];
  emailSendCount: any;
  emailPendingCount: any;
  emailFailedCount: any;
  metrics = {
    emailsSent: 0,
    emailsPending: 0,
    emailsFailed: 0
  };
  constructor(private emailService: EmailService,private http: HttpClient,private metricsService: MetricsService,private snackBar: MatSnackBar)
   { }
   showError(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 5000, panelClass: ['error-snackbar'] });
  }
  
  showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: ['success-snackbar'] });
  }
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  validateEmails(emails: string[]): { valid: string[], invalid: string[] } {
    const valid = emails.filter(email => this.validateEmail(email));
    const invalid = emails.filter(email => !this.validateEmail(email));
    return { valid, invalid };
  }
  sendEmails(): void {
    this.emails = this.emailData;
    console.log(this.emails, 'emails')
    this.statusMessages = []; // Clear previous statuses   
      this.emails.forEach((emailData) => {
        
          this.queueMails.push(emailData.email);
          const { valid, invalid } = this.validateEmails(this.queueMails);
          if (invalid.length > 0) {
            this.showError(`Invalid emails detected: ${invalid.join(', ')}`);
            return;
          }
          const personalizedBody = this.generateEmailBody(emailData);
          this.emailService
            .queueEmails(this.queueMails, 'Personalized Campaign', 'Hello')
            .subscribe({
              next: () =>{
                this.statusMessages.push(
                  `Email sent successfully to ${emailData.email}`
                );
                this.metricsService.updateMetrics('sent', 1).subscribe(
                  (data) => {
                    this.metrics = data;
                  },
                  (error) => {
                    console.error('Error updating metrics:', error);
                  }
                );
                this.metricsService.updateMetrics('pending', 1).subscribe(
                  (data) => {
                    this.metrics = data;
                  },
                  (error) => {
                    console.error('Error updating metrics:', error);
                  }
                );
              },
              error: (err) =>{
                this.statusMessages.push(
                  `Failed to send email to ${emailData.email}: ${err.message}`
                );
                this.metricsService.updateMetrics('failed', 1).subscribe(
                  (data) => {
                    this.metrics = data;
                  },
                  (error) => {
                    console.error('Error updating metrics:', error);
                  }
                );
              },
            });
   
      });
  }

  
 
  generateEmailBody(data: any): string {
    let body = this.emailTemplate;
    for (const key in data) {
      body = body.replace(`{${key}}`, data[key]);
    }
    return body;
  }
}
