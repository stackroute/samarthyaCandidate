import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EmailService } from 'app/services/email.service';
import { JsonDataService } from 'app/services/json-data.service';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
  providers: [JsonDataService]
})

export class VerifyEmailComponent implements OnInit {

  public userForm: FormGroup;
  public infoobj;
  public timer;
  public loading = false;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private emailservice: EmailService, private JsonDataService: JsonDataService,
    private snackBar: MdSnackBar, private viewContainerRef: ViewContainerRef, private router: Router) {
    // getting login form data
    this.userForm = fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
    });
  }

  ngOnInit() { }

  // snackBar for notification
  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  // on create account submit
  onVerifyLink() {
    this.infoobj = {
      'title': this.userForm.value.role,
      'username': this.userForm.value.email,
      'subject': 'Email verification'
    };
    console.log(this.infoobj)
    this.emailservice.sendEmail(this.infoobj).subscribe(resJsonData => {
      if (resJsonData.message === 'sent successfully') {
        this.openSnackBar('Verification Mail Sent', 'Please Check Your Mail');
      } else if (resJsonData.message === 'user already exist') {
        this.openSnackBar('User already exists', 'Please Login');
      }
      this.timer = setTimeout(() => this.router.navigate(['/login']), 500);
    },
      error => {
        this.openSnackBar('TECHNICAL ISSUE', 'Please Try after some time');
        this.timer = setTimeout(() => this.router.navigate(['/login']), 500);
      });
  }

  // go back to login
  onBack() {
    this.router.navigate(['/login']);
  }
}
