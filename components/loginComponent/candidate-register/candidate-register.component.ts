import { Component, OnInit, Inject, } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { JsonDataService } from './../../../services/json-data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { EmailService } from './../../../services/email.service';
import { Logger } from 'angular2-logger/core';
import { AuthenticationService } from './../../../services/authentication.service';
import { Data } from './../../../services/data.service';

@Component({
  selector: 'app-candidate-register',
  templateUrl: './candidate-register.component.html',
  styleUrls: ['./candidate-register.component.css'],
  providers: [JsonDataService]
})
export class CandidateRegisterComponent implements OnInit {

  public profession: any = [];
  public placementCenter: any = [];
  public userForm: FormGroup;
  public formData = {};
  public pincode: string;
  public pincodeLocation: any;
  public areaList: any = [];
  public password = '';
  public passwordMatchWarning = '';
  public checkUserEmail: any;
  public loading = true;
  public emailDisable = false;
  public createdBy: any;
  public district: any;
  public state: any;
  public landmark: any;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private authenticationService: AuthenticationService, private JsonDataService: JsonDataService, private route: ActivatedRoute,
    private router: Router, private http: Http, private emailService: EmailService, private data: Data,
    private snackBar: MdSnackBar, private viewContainerRef: ViewContainerRef, private logger: Logger) {

    // register candidate form
    this.userForm = fb.group({
      name: ['', [Validators.required]],
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      gender: ['male', Validators.required],
      email: ['', Validators.required],
      regId: ['', Validators.required],
      dob: ['', Validators.required],
      aadhar: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
      mob: ['', [Validators.required, , Validators.pattern('[0-9]{10}')]],
      role: ['candidate'],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,24}$/)]],
      conPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,24}$/)]],
      profession: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
      location: ['', Validators.required],
      placementCenter: ['', [Validators.required]]
    });
  }



  ngOnInit() {
    // getting languages and form data from json file
    this.JsonDataService.getPlacementCenter().subscribe((resJsonData: any) => this.getPlacementCenter(resJsonData));

    this.JsonDataService.getProfession().subscribe((resJsonData: any) => this.getProfession(resJsonData));

    this.JsonDataService.verifyToken(this.route.snapshot.queryParams['confirm']).subscribe((res: any) => {
      if (res.msg != 'Session Expired') {
        if (res.data.username) {
          this.userForm.patchValue({
            'email': res.data.username
          })
          this.emailDisable = true;
        }
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
  verifyUser(email: any) {
    this.JsonDataService.verifyUser(email).subscribe((resJsonData: any) => {
      if (resJsonData['msg'] === 'user not exist') {
        this.loading = false;
      } else if (resJsonData['msg'] === 'user already exist') {
        this.router.navigate(['/login']);
      }
    });
  }

  // redirect if user is undefined or already registered
  redirectInvalidUser(email: any) {
    if (email === undefined || this.checkUserEmail[0] === 'found') {
      this.logger.error('Invaild Email id, redirected to login');
      this.router.navigate(['/login']);
      // this.loading = false;

    } else {
      this.loading = false;
    }
  }

  // Getting placement Centers
  getPlacementCenter(jsonData: any) {
    this.placementCenter = jsonData;
  }

  // Getting Professions
  getProfession(jsonData: any) {
    this.profession = jsonData;
  }

  // password confirm Validators
  passwordValue(pass: string) {
    this.password = pass;
  }
  conPasswordValue(conPass: string) {
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
    if (this.pincode == undefined) {
    } else if (this.pincode.length === 6) {
      // this.loading = true;
      this.JsonDataService.getPincode(this.pincode).subscribe(
        (resPincodeData: any) => [this.pincodeLocation = resPincodeData, this.getPincodeLocation()]);
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
    this.pincodeLocation.records.forEach((element: any) => {
      officeName = element['officename'];
      officeName = officeName.substr(0, officeName.length - 4);
      this.areaList.push(officeName + ', ' + element['Districtname'] + ', ' + element['statename']);
    });
    if (this.areaList.length === 0) {
      // this.loading = false;
      this.data.openSnackBar('No Location Found', 'Please Try again');
      // this.areaList.push('Area Not Found');
    } else {
      this.data.openSnackBar(this.pincodeLocation.count + ' Locations Found', 'Please Select');
      // this.loading = false;
    }
  }

  // on form submit
  onRegister(userdata: any) {

    // check who is creating user
    let createdUser = this.authenticationService.getCreatedBy();
    if (createdUser == null) {
      this.createdBy = this.userForm.value.email;
    } else {
      this.createdBy = createdUser;
    }

    this.landmark = userdata.get('location').value.split(',')[0];
    this.district = userdata.get('location').value.split(',')[1];
    this.state = userdata.get('location').value.split(',')[2];
    let profilePic = '';
    console.log(userdata.get('gender').value)
    if (userdata.get('gender').value == 'male') {
      console.log('male')
      profilePic = 'assets/img/male.jpg';
    } else if (userdata.get('gender').value == 'female') {
      profilePic = 'assets/img/female.jpg';
    }
    console.log(profilePic)
    let userData = {
      profileData: {
        name: userdata.get('name').value,
        username: userdata.get('email').value,
        fname: userdata.get('fname').value,
        lname: userdata.get('lname').value,
        gender: userdata.get('gender').value,
        dob: userdata.get('dob').value,
        email: userdata.get('email').value,
        mobileNumber: userdata.get('mob').value,
        role: userdata.get('role').value,
        profession: userdata.get('profession').value,
        address1: '',
        address2: '',
        district: this.district,
        landmark: this.landmark,
        state: this.state,
        pincode: userdata.get('pincode').value,
        location: userdata.get('location').value,
        placementCenter: userdata.get('placementCenter').value,
        identity: [{ idType: "Aadhaar", value: userdata.get('aadhar').value },
        { idType: "RegNumber", value: userdata.get('regId').value }],
        createdBy: this.createdBy,
        updatedBy: this.createdBy,
        profilePic: profilePic
      },
      userCredentialsData: {
        username: userdata.get('email').value, password: userdata.get('password').value,
        role: userdata.get('role').value,
      }
    };
    console.log(userData)

    this.JsonDataService.registerUser(userData).subscribe((res: any) => {
      console.log(res);
      if (res['success']) {
        this.data.openSnackBar('Successfully Register', 'Please Login');
        this.router.navigate(['/login']);
      } else {
        this.data.openSnackBar('Registration Failed', 'Please Try Again');
        // this.router.navigate(['/login']);
      }
    }, (error: any) => {
      this.data.openSnackBar('Registration Failed', 'Please Try Again');
    })
  }
}
