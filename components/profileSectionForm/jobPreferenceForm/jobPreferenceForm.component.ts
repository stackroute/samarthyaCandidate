import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProfileSectionFormService } from './../../../services/profileSectionForm.service';


@Component({
  selector: 'jobPreference-form',
  templateUrl: './jobPreferenceForm.component.html',
  styleUrls: ['./jobPreferenceForm.component.css']
})
export class JobPreferenceInfoForm implements OnInit {

  public userForm: FormGroup;
  public infoobj: any;
  public timer: any;
  public emailId = '';
  public loading = false;
  public engagementData = ['Full Time', 'Part Time', 'Flexible'];
  public locationData=['Bangalore','Pune','Delhi','Gurgaon','Chennai'];
  public lookingFor: any = false;
  public jobRole: any = '';
  public engagement: any = '';
  public expectedSalMin: any = '';
  public expectedSalMax: any = '';
  public skills: any = '';
  public availableFrom: any = '';
  public locations: any = '';
  public showDiv: any = false;
  public jobPrefObj={};

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,private ProfileSectionFormService:ProfileSectionFormService,
    public dialogRef: MdDialogRef<JobPreferenceInfoForm>
  ) {
    if (this.dialogRef.config.data.jobRoles.length > 0) {
      this.jobRole = this.dialogRef.config.data.jobRoles['name'] || '';
      this.engagement = this.dialogRef.config.data.jobRoles['engagement'] || '';
      this.expectedSalMin = this.dialogRef.config.data.jobRoles['expectedSal'].min || '';
      this.expectedSalMax = this.dialogRef.config.data.jobRoles['expectedSal'].max || '';
      this.skills = this.dialogRef.config.data.jobRoles['skills'] || '';
      this.locations = this.dialogRef.config.data.jobRoles['locations'] || '';
    }
    if (this.dialogRef.config.data.looking) {
      this.lookingFor = 'YES';
      this.showDiv = true;
    }
    else {
      this.lookingFor = 'NO';
      this.showDiv = false;

    }

    this.userForm = fb.group({
      lookingFor: [this.lookingFor, [Validators.required]],
      jobRole: [this.jobRole, [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
      engagement: [this.engagement, [Validators.required, Validators.pattern(/[a-z]/)]],
      expectedSalMin: [this.expectedSalMin, [Validators.required, Validators.pattern(/[0-9]/)]],
      expectedSalMax: [this.expectedSalMax, [Validators.required, Validators.pattern(/[0-9]/)]],
      skills: [this.skills, [Validators.required, Validators.pattern('[a-zA-Z]')]],
      availableFrom: [this.availableFrom, [Validators.required]],
      locations: [this.locations, [Validators.required]]
    });
  }


  ngOnInit() {
  }
  showDivandHide(userdata: any) {
    if (this.showDiv) {
      this.showDiv = false;
    }
    else {
      this.showDiv = true;
    }
  }

  onSave() {
    let jobPreferenceInfoData = this.dialogRef.config.data;
     this.jobPrefObj={
          "looking":this.userForm.value.lookingFor,
          jobRoles:{
            "name":this.userForm.value.jobRole || '',
            "engagement":this.userForm.value.engagement || '',
            "expectedSal":{
              "min":this.userForm.value.expectedSalMin || '',
              "max":this.userForm.value.expectedSalMax || ''
            },
            "skills":this.userForm.value.skills || '',
            "availablefrom":this.userForm.value.availablefrom || '',
            "locations":this.userForm.value.locations || ''
          }
        }
        this.ProfileSectionFormService.editJobPreference("jobPreferences",this.jobPrefObj)
  }
}

