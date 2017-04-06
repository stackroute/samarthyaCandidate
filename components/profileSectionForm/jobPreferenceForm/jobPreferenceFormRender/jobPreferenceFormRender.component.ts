import { Component, OnInit, Inject, Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { Data } from './../../../../services/data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'jobPreference-form-render',
  templateUrl: './jobPreferenceFormRender.component.html',
  styleUrls: ['./jobPreferenceFormRender.component.css']
})
export class JobPreferenceFormRender implements OnInit {

  public userForm: FormGroup;

  @Input()
  public jobPreferenceData: any[];


  constructor(private fb: FormBuilder, private location: Location, private http: Http, private router: Router, private data: Data) {
  }

  ngOnInit() {
    if (this.jobPreferenceData.length > 0) {
      this.userForm = this.fb.group({
        AllJobPreference: this.fb.array(this.initJobsPreferenceFormWithData())
      });
    } else {
      this.userForm = this.fb.group({
        AllJobPreference: this.fb.array([this.initJobPreferenceForm()])
      });
    }
  }

  initJobsPreferenceFormWithData() {
    let jobPreferenceEntries = this.jobPreferenceData.map((jobPreference) => {
      return this.fb.group({
          jobRole: [jobPreference.jobRole, [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
      engagement: [jobPreference.engagement, [Validators.required, Validators.pattern(/[a-z]/)]],
      expectedSalMin: [jobPreference.expectedSalMin, [Validators.required, Validators.pattern(/[0-9]/)]],
      expectedSalMax: [jobPreference.expectedSalMax, [Validators.required, Validators.pattern(/[0-9]/)]],
      skills: [jobPreference.skills, [Validators.required, Validators.pattern('[a-zA-Z]')]],
      availableFrom: [jobPreference.availableFrom, [Validators.required]],
      locations: [jobPreference.locations, [Validators.required]]
      });
    });

    return jobPreferenceEntries;
  }

  //to get the form 
  initJobPreferenceForm() {
    return this.fb.group({
     jobRole: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
      engagement: ['', [Validators.required, Validators.pattern(/[a-z]/)]],
      expectedSalMin: ['', [Validators.required, Validators.pattern(/[0-9]/)]],
      expectedSalMax: ['', [Validators.required, Validators.pattern(/[0-9]/)]],
      skills: ['', [Validators.required, Validators.pattern('[a-zA-Z]')]],
      availableFrom: ['', [Validators.required]],
      locations: ['', [Validators.required]]
    });
  }

  addJobPreference() {
    const control = <FormArray>this.userForm.controls['AllJobPreference'];
    control.push(this.initJobPreferenceForm());
  }

  removeJobPreference(i: number) {
    const control = <FormArray>this.userForm.controls['AllJobPreference'];
    control.removeAt(i);
  }
  onSave() {
    let sectionName = "jobPreferences";
    let currentuser = JSON.parse(localStorage.getItem('currentUser'));
    this.http.patch('/profile', { sectionName: sectionName, username: currentuser.username, data: this.userForm.value.AllJobPreference })
      .subscribe((response) => {
        let res = response.json();
        if (res.success) {
          this.data.openSnackBar("Successfully updated", "OK");
          location.reload();
        }
        else {
          this.data.openSnackBar("Not updated", "Try later");

        }

      }, (err) => {
        this.data.openSnackBar("Technical Error", "Try again");

      });

  }




}

