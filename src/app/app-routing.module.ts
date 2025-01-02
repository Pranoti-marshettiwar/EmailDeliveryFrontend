// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CsvUploadComponent } from './csv-upload/csv-upload.component';
import { TemplateEditorComponent } from './template-editor/template-editor.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'csv-upload', component: CsvUploadComponent },
  { path: 'template-editor', component: TemplateEditorComponent },
  // { path: 'email-sending', component: EmailSendingComponent },
  // { path: 'ai-suggestions', component: AiSuggestionsComponent },
  // { path: 'campaign-metrics', component: CampaignMetricsComponent },
  // { path: 'error-logging', component: ErrorLoggingComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
