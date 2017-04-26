import { Component, OnInit, Inject, Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { Data } from './../../../../services/data.service';

@Component({
  selector: 'jobPreference-form-render',
  templateUrl: './jobPreferenceFormRender.component.html',
  styleUrls: ['./jobPreferenceFormRender.component.css']
})
export class JobPreferenceFormRender implements OnInit {

  public userForm: FormGroup;

  @Input()
  public jobPreferenceData: any[];

  public engagementData = ['Full Time', 'Part Time', 'Flexible'];
  public locationData = ['Bangalore', 'Pune', 'Delhi', 'Gurgaon', 'Chennai'];

  constructor(private fb: FormBuilder, private http: Http, private router: Router, private data: Data) {
  }

  minDate: Date = null;
  maxDate: Date = null;


  ngOnInit() {


    let today: Date = new Date();
    // this.minDate = new Date(today);
    // this.minDate.setMonth(this.minDate.getMonth() - 3);

    this.maxDate = new Date(today);
    this.maxDate.setFullYear(this.maxDate.getFullYear());

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
        name: [jobPreference.name, [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
        engagement: [jobPreference.engagement, [Validators.required, Validators.pattern(/[a-z]/)]],
        expectedSalMin: [jobPreference.expectedSal.min, [Validators.required, Validators.pattern(/[0-9]/)]],
        expectedSalMax: [jobPreference.expectedSal.max, [Validators.required, Validators.pattern(/[0-9]/)]],
        skills: [jobPreference.skills, [Validators.required]],
        availableFrom: [jobPreference.availablefrom, [Validators.required]],
        locations: [jobPreference.locations, [Validators.required]]
      });
    });

    return jobPreferenceEntries;
  }

  //to get the form
  initJobPreferenceForm() {
    return this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
      engagement: ['', [Validators.required, Validators.pattern(/[a-z]/)]],
      expectedSalMin: ['', [Validators.required, Validators.pattern(/[0-9]/)]],
      expectedSalMax: ['', [Validators.required, Validators.pattern(/[0-9]/)]],
      skills: ['', [Validators.required]],
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
    let jobs: any = [];
    this.userForm.value.AllJobPreference.forEach(function (d: any) {
      let skill:any =[];
      if (d.skills.includes(',')) {
        skill = d.skills.split(',');
      }
      else {
         if(typeof d.skills == typeof '')
        skill.push(d.skills);
        else
        skill=d.skills;
      }

      let obj = { 'name': d.name, 'expectedSal': { 'min': d.expectedSalMin, 'max': d.expectedSalMax }, 'engagement': d.engagement, 'skills': skill, 'availablefrom': d.availableFrom, 'locations': d.locations }
      jobs.push(obj);
    })
    let jobPref = { looking: true, jobRoles: jobs }
    let currentuser = JSON.parse(localStorage.getItem('currentUser'));
    this.http.patch('/profile', { sectionName: sectionName, username: currentuser.username, data: jobPref })
      .subscribe((response) => {
        let res = response.json();
        if (res.success) {
          this.data.openSnackBar("Successfully updated", "OK");
          this.router.navigate(['/login']);
        }
        else {
          this.data.openSnackBar("Not updated", "Try later");

        }

      }, (err) => {
        this.data.openSnackBar("Technical Error", "Try again");

      });

  }

}

