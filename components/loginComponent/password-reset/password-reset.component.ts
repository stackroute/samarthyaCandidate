import { EmailService } from './../../../services/email.service';
import { JsonDataService } from './../../../services/json-data.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
//import { JsonDataService } from 'app/services/json-data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Data } from './../../../services/data.service';
import { AuthenticationService } from './../../../services/authentication.service';

//import { EmailService } from 'app/services/email.service';
// declare var $: any;

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})

export class PasswordResetComponent implements OnInit {

  public userForm: FormGroup;
  public password = '';
  public passwordMatchWarning = '';
  public checkUserEmail: any;
  public loading = true;
  public emailDisable = false;
  public reset: any;
  private token: any;
  private loginStatus: boolean;

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    private JsonDataService: JsonDataService,
    private route: ActivatedRoute,
    private router: Router,
    private emailService: EmailService,
    private data: Data,
    private AuthenticationService: AuthenticationService
  ) {
    // register candidate form
    this.userForm = fb.group({
      email: [{ value: '', disabled: true }],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,24}$/)]],
      conPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,24}$/)]],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params :any) => this.reset = params['reset']);
    if (this.reset == 'reset') {
      this.loginStatus = true;
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      let email = currentUser.username;
      this.userForm.patchValue({
        'email': email
      });
      this.loading = false;
    }
    else {
      this.loginStatus = false;
      this.token = this.route.snapshot.queryParams['confirm']
      // this.route.params.subscribe(params => this.token = params['confirm']);
      let email;
      this.AuthenticationService.getEmail(this.token).subscribe((res : any) => {
        email = res.data['username'];
        this.userForm.patchValue({
          'email': email
        });
        this.loading = false;
      })
    }
  }

  // check if email is undefined or already exists
  verifyUser(email: any) {
    this.JsonDataService.verifyUser(email).subscribe((resJsonData : any) => {
      if (resJsonData['msg'] === 'user not exist') {
        this.router.navigate(['/login']);

      } else if (resJsonData['msg'] === 'user already exist') {
        this.loading = false;
      }
    });
  }

  // redirect if user is undefined or already registered
  redirectInvalidUser(email: any) {
    if (email === undefined || this.checkUserEmail[0] === 'nouser') {
      this.router.navigate(['/login']);
    } else {
      this.loading = false;
    }
  }

  // password confirm Validators
  passwordValue(pass: string) {
    this.password = pass;
  }
  conPasswordValue(conPass: string, pass: string) {
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
    this.AuthenticationService.passwordChange(this.userForm.get('email').value, this.userForm.get('password').value).subscribe(
      (res : any) => {
        if (res.success == true) {
          this.router.navigate(['/home']);
          this.data.openSnackBar(res.msg, 'OK');
        }
        else {
          this.data.openSnackBar(res.msg, 'OK');
          this.router.navigate(['/home']);
        }
      }
    );
  }

  // on back button
  onBack() {
    this.router.navigate(['/login']);
  }
}
