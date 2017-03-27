import { JsonDataService } from './../../../services/json-data.service';
import { EmailService } from './../../../services/email.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { Data } from './../../../services/data.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [JsonDataService]

})
export class ForgotPasswordComponent implements OnInit {

  public userForm: FormGroup;
  public infoobj: any;
  public timer: any;
  public emailId = '';
  public loading = false;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private emailservice: EmailService, private JsonDataService: JsonDataService,
    private data: Data, private viewContainerRef: ViewContainerRef, private router: Router, private emailService: EmailService) {
    // getting login form data
    this.userForm = fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
    });
  }

  ngOnInit() {
    // this.emailService.getRegister()
    //   .subscribe(resEmployeeData => {
    //     this.emailId = resEmployeeData.usermail2;
    //     console.log(this.emailId);
    //   });
  }

  // on password reset submit
  onResetLink() {
    this.loading = true;
    this.infoobj = {
      'title': this.userForm.value.role,
      'username': this.userForm.value.email,
      'subject': 'Password Reset'
    };
    this.emailservice.sendResetPasswordEmail(this.infoobj).subscribe(resJsonData => {
      // console.log(resJsonData);
      if (resJsonData['msg'] === 'user does not exist') {
        this.loading = false;
        this.data.openSnackBar('You are Not Registered', 'Please Register');
      } else if (resJsonData['msg'] === 'Mail sent Successfully') {
        this.loading = false;
        this.data.openSnackBar('Reset Link Sent Successfully', 'Please Check Your Mail');
        this.timer = setTimeout(() => this.router.navigate(['/login']), 500);
      }
    },
      error => {
        this.data.openSnackBar('TECHNICAL ISSUE', 'Please Try after some time');
        this.timer = setTimeout(() => this.router.navigate(['/login']), 500);
      });

  }
  onBack() {
    this.router.navigate(['/login']);
  }
}
