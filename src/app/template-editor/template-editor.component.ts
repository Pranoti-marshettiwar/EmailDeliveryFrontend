import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: ['./template-editor.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class TemplateEditorComponent {
  @Input() emailData:any;
 
  emailTemplate: string = '';
  // previewData = {
  //   first_name: 'John',
  //   email: 'john.doe@example.com',
  // };
  previewData: { first_name: string; email: string } = {
    first_name: '',
    email: '',
  };
  previewContent: string = '';

  onPreview(index: number): void {
    if (this.emailData && this.emailData[index]) {
      this.previewData = this.emailData[index]; // Select specific row for preview
      this.previewContent = this.replacePlaceholders(this.emailTemplate, this.previewData);
    } else {
      console.error('Invalid index or emailData is empty.');
    }
  }

  replacePlaceholders(template: string, data: { [key: string]: string }): string {
    return template.replace(/{(.*?)}/g, (_, key) => data[key] || `{${key}}`);
  }

  onSaveTemplate(): void {
    console.log('Saved template:', this.emailTemplate);
    // Logic to save template (e.g., send to backend or store locally)
  }
}
