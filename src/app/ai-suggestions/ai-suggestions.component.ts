import { Component } from '@angular/core';
import { AiService } from 'src/app/services/ai.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-ai-suggestions',
  templateUrl: './ai-suggestions.component.html',
  styleUrls: ['./ai-suggestions.component.scss'],
  imports: [FormsModule,CommonModule]
})
export class AiSuggestionsComponent {
  campaignDescription: string = '';
  suggestions: string | null = null;
  loading: boolean = false;

  constructor(private aiService: AiService) {}

  generateSuggestions(): void {
    if (!this.campaignDescription) {
      alert('Please enter a campaign description.');
      return;
    }

    this.loading = true;
    this.aiService.getSuggestions(this.campaignDescription).subscribe(
      (response) => {
        this.suggestions = response.suggestions;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching suggestions:', error);
        this.loading = false;
      }
    );
  }
}
