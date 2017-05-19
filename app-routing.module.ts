import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CandidateRegisterComponent } from './components/loginComponent/candidate-register/candidate-register.component';
import { LoginComponent } from './components/loginComponent/login/login.component';
import { PasswordResetComponent } from './components/loginComponent/password-reset/password-reset.component';
import { ForgotPasswordComponent } from './components/loginComponent/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/loginComponent/verify-email/verify-email.component';
import { AuthGuard } from './Guard/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';
// import { LoginGuard } from './Guard/login.guard';

// routes
const routes: Routes = [
  {
    path: 'home', component: LayoutComponent, canActivateChild: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'aboutUs', component: AboutUsComponent },
      { path: 'passwordReset/:reset', component: PasswordResetComponent }
    ]
  },
  { path: 'home', component: DashboardComponent, canActivateChild: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'register', component: CandidateRegisterComponent },
  { path: 'verifyEmail', component: VerifyEmailComponent },
  { path: 'passwordReset', component: PasswordResetComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { };

export const routingComponents = [
  AboutUsComponent,
  DashboardComponent,
  CandidateRegisterComponent,
  PasswordResetComponent,
  ForgotPasswordComponent,
  VerifyEmailComponent
];
