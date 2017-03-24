import { EmailService } from './../../../services/email.service';
import { JsonDataService } from './../../../services/json-data.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
//import { JsonDataService } from 'app/services/json-data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Data } from './../../../services/data.service';

//import { EmailService } from 'app/services/email.service';
// declare var $: any;

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})

export class PasswordResetComponent implements OnInit {

  public jsonObj = {};
  public languages = [];
  public userForm: FormGroup;
  public emailId = '';
  public password = '';
  public passwordMatchWarning = '';
  public checkUserEmail;
  public loading = true;
  public emailDisable = false;


  constructor( @Inject(FormBuilder) fb: FormBuilder, private JsonDataService: JsonDataService, private route: ActivatedRoute,
    private router: Router, private emailService: EmailService, private data: Data) {
    // register candidate form
    this.userForm = fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,24}$/)]],
      conPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,24}$/)]],
    });
  }

  ngOnInit() {

    this.JsonDataService.verifyToken(this.route.snapshot.queryParams['confirm']).subscribe(res => {
      if (res.msg != 'Session Expired') {
        if (res.data.username) {
          this.userForm.patchValue({
            'email': res.data.username
          })
          this.emailDisable = true;
        }
        console.log(this.userForm.value.email);

        this.verifyUser(this.userForm.value.email);

      }
      else {
        this.router.navigate(['/login']);
        this.data.openSnackBar(res.msg['msg'], "OK");
      }
    },
      (err) => {
        this.router.navigate(['/login']);
        this.data.openSnackBar("Session Expired", "OK");
      })

  }

  // check if email is undefined or already exists
  verifyUser(email) {
    this.JsonDataService.verifyUser(email).subscribe(resJsonData => {
      if (resJsonData['msg'] === 'user not exist') {
        this.router.navigate(['/login']);

      } else if (resJsonData['msg'] === 'user already exist') {
        this.loading = false;
      }
    });
  }

  // redirect if user is undefined or already registered
  redirectInvalidUser(email) {
    if (email === undefined || this.checkUserEmail[0] === 'nouser') {
      console.log(this.checkUserEmail[0]);
      console.log('redireted');
      this.router.navigate(['/login']);
    } else {
      this.loading = false;
    }
  }


  // password confirm Validators
  passwordValue(pass) {
    this.password = pass;
  }
  conPasswordValue(conPass, pass) {
    if (pass !== conPass) {
      this.passwordMatchWarning = 'Password Not Match';
      (<HTMLInputElement>document.getElementById('resetBtn')).disabled = true;
    } else {
      this.passwordMatchWarning = '';
      // (<HTMLInputElement> document.getElementById("resetBtn")).disabled = false;
    }
  }

  // on form submit
  onSubmit() {
    console.log('submit');
    this.userForm.value.email = this.emailId;
    
    // console.log(this.userForm.value);
  }

  // on back button
  onBack() {
    this.router.navigate(['/login']);
  }
}
