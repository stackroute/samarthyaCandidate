import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Data } from './../../../services/data.service';


@Component({
  selector: 'workExperienceForm-form',
  templateUrl: './workExperienceForm.component.html',
  styleUrls: ['./workExperienceForm.component.css']
})
export class WorkExperienceForm implements OnInit {
    public userForm: FormGroup;
  public infoobj: any;
  public timer: any;
  public loading = false;
  public status = false;
  public workExperienceData: any[] = [];
  public duration: {};

  constructor(private http: Http, private router: Router, private data: Data,
    @Inject(FormBuilder) fb: FormBuilder,
    public dialogRef: MdDialogRef<WorkExperienceForm>
  ) {
    this.userForm = fb.group({
      workplace: [this.dialogRef.config.data.workplace, [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
      designation: [this.dialogRef.config.data.designation, [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
      jobRole: [this.dialogRef.config.data.jobRole, [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
      location: [this.dialogRef.config.data.location, [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
      from: [this.dialogRef.config.data.from, Validators.required],
      till: [this.dialogRef.config.data.till, Validators.required],
      iscurrent: [this.dialogRef.config.data.status]
    });
  } ngOnInit() {
    console.log(this.dialogRef.config.data);
  }

  onSave() {
    let obj = { from: this.userForm.value.from, till: this.userForm.value.till };

    let workExperienceData = {};
    workExperienceData['workplace'] = this.userForm.value.workplace;
    workExperienceData['designation'] = this.userForm.value.designation;
    workExperienceData['jobRole'] = this.userForm.value.jobRole;
    workExperienceData['location'] = this.userForm.value.location;
    workExperienceData['duration'] = obj
    workExperienceData['iscurrent'] = this.userForm.value.status;

    let username = JSON.parse(localStorage.getItem('currentUser'))['username'];
    this.http.patch('/profile', { data: workExperienceData, username: username, sectionName: 'experiences' })
      .subscribe((response: Response) => {
        console.log('-->', response['_body']);
        if (response['_body']) {
          console.log('yes');
          this.router.navigate(['/login']);
          this.data.openSnackBar('Successfully Updated', '');
        }
      });
  }
  public workingStatus() {
    if (this.status === true) {
      this.status = false;
    } else {
      this.status = true;
    }
  }
}