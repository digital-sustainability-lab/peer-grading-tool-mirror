import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GradingComponent } from './grading/grading.component';
import { CampaignSummaryComponent } from './campaign-summary/campaign-summary.component';
import { PeerGradingReviewComponent } from './grading-review/grading-review.component';
import { NavComponent } from './header/nav/nav.component';
import { CampaignGroupSummaryComponent } from './campaign-summary/campaign-group-summary/campaign-group-summary.component';
import { FormErrorComponent } from './form-error/form-error.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ToolTipComponent } from './tool-tip/tool-tip.component';
import { GroupComponent } from './create-campaign/group/group.component';
import { DatePipe } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MainInterceptor } from './interceptors/main.interceptor';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { CreateAdminUserComponent } from './create-admin-user/create-admin-user.component';
import { PdfReviewComponent } from './pdf/pdf-review/pdf-review.component';
import { PdfSummaryComponent } from './pdf/pdf-summary/pdf-summary.component';
import { WarnDialogComponent } from './warn-dialog/warn-dialog.component';
import { ProfileComponent } from './profile/profile.component';
import { CriteriaComponent } from './create-campaign/criteria/criteria.component';
import { SingleRowComponent } from './grading/single-row/single-row.component';
import { ExcelComponent } from './excel/excel.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { HttpErrorComponent } from './http-error/http-error.component';
import { LangInterceptor } from './interceptors/lang.interceptor';
import { PeerComponent } from './create-campaign/group/peer/peer.component';
import { CampaignComponent } from './admin-dashboard/campaign/campaign.component';
import { CampaignMetaComponent } from './campaign-meta/campaign-meta.component';
import { GroupMetaComponent } from './group-meta/group-meta.component';
import { CampaignButtonsComponent } from './campaign-buttons/campaign-buttons.component';
import { CampaignStatusPipe } from './pipes/campaign-status.pipe';
import { LanguageSwitchComponent } from './language-switch/language-switch.component';

// material imports
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { GroupCommentsComponent } from './campaign-summary/campaign-group-summary/group-comments/group-comments.component';
import { SingleCommentComponent } from './grading/single-comment/single-comment.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateCampaignComponent,
    GradingComponent,
    CampaignSummaryComponent,
    PeerGradingReviewComponent,
    NavComponent,
    CampaignGroupSummaryComponent,
    FormErrorComponent,
    LoginComponent,
    HeaderComponent,
    ToolTipComponent,
    GroupComponent,
    AdminDashboardComponent,
    AboutComponent,
    AdminUserListComponent,
    CreateAdminUserComponent,
    PdfReviewComponent,
    PdfSummaryComponent,
    WarnDialogComponent,
    ProfileComponent,
    CriteriaComponent,
    SingleRowComponent,
    ExcelComponent,
    HttpErrorComponent,
    PeerComponent,
    CampaignComponent,
    CampaignMetaComponent,
    GroupMetaComponent,
    CampaignButtonsComponent,
    CampaignStatusPipe,
    LanguageSwitchComponent,
    GroupCommentsComponent,
    SingleCommentComponent,
    RegisterComponent,
    ConfirmEmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DatePipe,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: LangInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: MainInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    Title,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
