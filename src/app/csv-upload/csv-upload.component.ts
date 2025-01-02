import { Component } from '@angular/core';
import * as Papa from 'papaparse';
import { CommonModule } from '@angular/common';
import { TemplateEditorComponent } from '../template-editor/template-editor.component';
import { EmailCampaignComponent } from '../email-campaign/email-campaign.component';
import {AiSuggestionsComponent} from '../ai-suggestions/ai-suggestions.component';

@Component({
  selector: 'app-csv-upload',
  templateUrl: './csv-upload.component.html',
  styleUrls: ['./csv-upload.component.scss'],
  standalone: true,
  imports: [CommonModule,TemplateEditorComponent,EmailCampaignComponent,AiSuggestionsComponent],
})
export class CsvUploadComponent {
  emails: any[] = [];
  errorMessage: string = '';
  data: any;

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.errorMessage = 'Please select a file.';
      return;
    }

    const file = input.files[0];
    if (file && file.type !== 'text/csv') {
      this.errorMessage = 'Please upload a CSV file.';
      return;
    }

    this.errorMessage = ''; // Clear previous errors

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        this.processCsvData(result.meta.fields, result.data);
      },
    });
  }

  
  processCsvData(headers: string[] | undefined, data: any[]): void {
    // if (!data[0]?.email || !data[0]?.first_name) {
    //   this.errorMessage = 'CSV must contain "email" and "first_name" fields.';
    //   return;
    // }
    if (!headers || !headers.includes('email') || !headers.includes('first_name')) {
      this.errorMessage = 'CSV file must contain "email" and "first_name" fields.';
      return;
    }
    this.emails = data.map((row: any) => ({
      email: row.email,
      first_name: row.first_name,
    }));
    console.log('Email campaign submitted:', this.emails);
  }

  onSubmit(): void {
    if (this.emails.length === 0) {
      this.errorMessage = 'No valid email data to submit.';
      return;
    }

    console.log('Email campaign submitted:', this.emails);
  }
}
