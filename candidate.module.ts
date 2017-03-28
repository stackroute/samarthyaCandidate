import { MainComponent } from './mainComponent';
import { UserService } from './services/user.service';
import { ProfileService } from './services/profile.service';
import { JsonDataService } from './services/json-data.service';
import { EmailService } from './services/email.service';
import { Data } from './services/data.service';
import { AuthenticationService } from './services/authentication.service';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { ModuleWithProviders } from '@angular/core';
import { VerifyEmailComponent } from './components/loginComponent/verify-email/verify-email.component';
import { PasswordResetComponent } from './components/loginComponent/password-reset/password-reset.component';
import { LoginHeaderComponent } from './components/loginComponent/login-header/login-header.component';
import { LoginFooterComponent } from './components/loginComponent/login-footer/login-footer.component';
import { ForgotPasswordComponent } from './components/loginComponent/forgot-password/forgot-password.component';
import { LoginComponent } from './components/loginComponent/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { JobPostComponent } from './components/job-post/job-post.component';
import { EventPostComponent } from './components/event-post/event-post.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployersComponent } from './components/employers/employers.component';
import { CandidateRegisterComponent } from './components/loginComponent/candidate-register/candidate-register.component';
import { CandidateSearchComponent } from './components/candidate-search/candidate-search.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import 'hammerjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Md2Module } from 'md2';
import { SamarthyaWebComponentsModule } from 'samarthyaWebcomponent';
import { SamProfileCardService } from './services/sam-profile-card.service';
import { SamProfileSectionConfigService } from './services/sam-profile-section-config.service';
import { SamProfileSectionFormComponent } from 'samarthyaWebcomponent/sam-profile/sam-profile-section-form/sam-profile-section-form.component';
import { SamProfileSectionComponent } from 'samarthyaWebcomponent/sam-profile/sam-profile-section/sam-profile-section.component';
import { SamProfileCardComponent } from 'samarthyaWebcomponent/sam-profile/sam-profile-card/sam-profile-card.component';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		MaterialModule.forRoot(),
		Md2Module.forRoot(),
		ReactiveFormsModule,
		FlexLayoutModule,
		AppRoutingModule,
		SamarthyaWebComponentsModule,

	],
	declarations: [
		AboutUsComponent,
		CandidateSearchComponent,
		CandidateRegisterComponent,
		DashboardComponent,
		EmployersComponent,
		EventPostComponent,
		JobPostComponent,
		LayoutComponent,
		LoginComponent,
		CandidateRegisterComponent,
		ForgotPasswordComponent,
		LoginFooterComponent,
		LoginHeaderComponent,
		PasswordResetComponent,
		VerifyEmailComponent,
		MainComponent,
		routingComponents,

	],
	bootstrap: [MainComponent],
	exports: [
		AboutUsComponent,
		CandidateSearchComponent,
		CandidateRegisterComponent,
		DashboardComponent,
		EmployersComponent,
		EventPostComponent,
		JobPostComponent,
		LayoutComponent,
		LoginComponent,
		CandidateRegisterComponent,
		ForgotPasswordComponent,
		LoginFooterComponent,
		LoginHeaderComponent,
		PasswordResetComponent,
		VerifyEmailComponent,
		MainComponent,
		routingComponents,
		SamProfileCardComponent,
		SamProfileSectionComponent,
		SamProfileSectionFormComponent
	]
})

export class CandidateModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: CandidateModule,
			providers: [
				AuthenticationService,
				Data,
				EmailService,
				JsonDataService,
				ProfileService,
				UserService,
				SamProfileCardService,
				SamProfileSectionConfigService,
			]
		}
	}
}
