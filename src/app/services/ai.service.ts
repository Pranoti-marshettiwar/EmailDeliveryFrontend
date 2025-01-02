import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private apiUrl = 'http://localhost:5000/ai';

  constructor(private http: HttpClient) {}

  getSuggestions(campaignDescription: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/suggestions`, { campaignDescription });
  }
}
