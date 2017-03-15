import { Component, OnInit, Inject, } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { JsonDataService } from 'app/services/json-data.service';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { EmailService } from 'app/services/email.service';
import { Logger } from 'angular2-logger/core';

@Component({
  selector: 'app-candidate-register',
  templateUrl: './candidate-register.component.html',
  styleUrls: ['./candidate-register.component.css'],
  providers: [JsonDataService]
})
export class CandidateRegisterComponent implements OnInit {

  public jsonObj = {};
  public languages = [];
  public profession = [];
  public locations = [];
  public placementCenter = [];
  public userForm: FormGroup;
  public emailId = '';
  public formData = {};
  public candidates;
  public timer;
  public pincode;
  public pincodeLocation;
  public areaList = [];
  public password = '';
  public passwordMatchWarning = '';
  public checkUserEmail;
  public loading = true;
  // public loading = false;
  public infoObj;
  public postObject;

  ngOnInit() {
    // getting languages and form data from json file
    this.JsonDataService.getPlacementCenter().subscribe(resJsonData => this.getPlacementCenter(resJsonData));

    this.JsonDataService.getLocations().subscribe(resJsonData => this.getLocations(resJsonData));

    this.JsonDataService.getProfession().subscribe(resJsonData => this.getProfession(resJsonData));

    this.emailService.getRegister()
      .subscribe(resEmployeeData => {
        [this.emailId = resEmployeeData.usermail2, this.checkEmail(this.emailId)];
      });
  }

  // check if email is undefined or already exists
  checkEmail(email) {
    this.JsonDataService.getEmail(email).subscribe(resJsonData => [
      this.checkUserEmail = resJsonData, this.redirectInvalidUser(email)],
      error => {
        this.openSnackBar('TECHNICAL ISSUE', 'Please Try after some time');
      });
  }

  // redirect if user is undefined or already registered
  redirectInvalidUser(email) {
    if (email === undefined || this.checkUserEmail[0] === 'found') {
      // console.log(this.checkUserEmail[0]);
      // console.log('redireted');
      this.logger.error('Invaild Email id, redirected to login');
      this.router.navigate(['/login']);
      // this.loading = false;

    } else {
      this.loading = false;
    }
  }

  // Getting placement Centers
  getPlacementCenter(jsonData) {
    this.placementCenter = jsonData;
  }

  // Getting data locations
  getLocations(jsonData) {
    this.locations = jsonData;
  }

  // Getting Professions
  getProfession(jsonData) {
    this.profession = jsonData;
  }

  constructor( @Inject(FormBuilder) fb: FormBuilder, private JsonDataService: JsonDataService, private route: ActivatedRoute,
    private router: Router, private http: Http, private emailService: EmailService,
    private snackBar: MdSnackBar, private viewContainerRef: ViewContainerRef, private logger: Logger) {

    // register candidate form
    this.userForm = fb.group({
      fname: ['', [Validators.required, Validators.pattern('[A-Za-z]{2,}')]],
      lname: ['', [Validators.required]],
      gender: ['male', Validators.required],
      email: [{ value: '', disabled: true }],
      regId: ['', Validators.required],
      // dob:'',
      aadhar: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
      mob: ['', [Validators.required, , Validators.pattern('[0-9]{10,11}')]],

      password: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,24}$/)]],
      conPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,24}$/)]],

      profession: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
      location: ['', Validators.required],
      placementCenter: ['', [Validators.required]]
    });
  }

  // snackBar for notification
  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  // password confirm Validators
  passwordValue(pass) {
    this.password = pass;
  }
  conPasswordValue(conPass) {
    if (this.password !== conPass) {
      this.passwordMatchWarning = 'Password Not Match';
      (<HTMLInputElement>document.getElementById('resetBtn')).disabled = true;
    } else {
      this.passwordMatchWarning = '';
      // (<HTMLInputElement> document.getElementById(''resetBtn'')).disabled = false;
    }
  }

  // check Pincode
  getPincode() {
    if (this.pincode.length === 6) {
      // this.loading = true;
      // console.log(this.pincode);
      this.JsonDataService.getPincode(this.pincode).subscribe(
        resPincodeData => [this.pincodeLocation = resPincodeData, this.getPincodeLocation()]);
    } else if (this.pincode.length !== 6) {
      this.areaList = [];
      this.userForm.value.location = '';
    }
  }

  // get pincode locations after checking pincode
  getPincodeLocation() {
    let officeName;
    this.userForm.value.location = '';
    this.areaList = [];
    this.pincodeLocation.records.forEach(element => {
      officeName = element['officename'];
      officeName = officeName.substr(0, officeName.length - 4);
      this.areaList.push(officeName + ', ' + element['Districtname'] + ', ' + element['statename']);
    });
    if (this.areaList.length === 0) {
      // this.loading = false;
      this.openSnackBar('No Location Found', 'Please Try again');
      // this.areaList.push('Area Not Found');
    } else {
      this.openSnackBar(this.pincodeLocation.count + ' Locations Found', 'Please Select');
      // this.loading = false;
    }
  }

  // on form submit
  onRegister() {
    // console.log(this.userForm.value);
    // console.log(this.emailId);
    if (this.emailId === '') {
      this.openSnackBar('No Email Id Present', 'Please Verify Email');
    } else {
      this.userForm.value.email = this.emailId;
      this.formData = this.userForm.value;
      this.JsonDataService.create(this.formData);
      this.openSnackBar('Successfully Register', 'Please Login');
      this.infoObj = {
        'to': this.emailId,
        'subject': 'Email verification',
        'mailBody': 'welcome to samarthya'
      };
      this.emailService.postdata2(this.infoObj).subscribe(data => this.postObject = data,
        error => [this.openSnackBar('WELCOME MAIL SENT', 'Please Check your MAIL'),
        this.timer = setTimeout(() => this.router.navigate(['/login']), 500)], () => console.log('finished'));

      this.timer = setTimeout(() => this.router.navigate(['/login']), 500);
    }
  }
}
