import { Data } from './../../../services/data.service';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'qualification-form',
  templateUrl: './qualificationForm.component.html',
  styleUrls: ['./qualificationForm.component.css'],
})

export class QualificationForm implements OnInit {

  public userForm: FormGroup;
  public infoobj: any;
  public timer: any;
  public emailId = '';
  public loading = false;

  constructor(private http: Http, private router: Router, private data: Data,
    @Inject(FormBuilder) fb: FormBuilder,
    public dialogRef: MdDialogRef<QualificationForm>
  ) {
    this.userForm = fb.group({
      name: [this.dialogRef.config.data.name, [Validators.required]],
      subject: [this.dialogRef.config.data.subject, [Validators.required]],
      academictype: [this.dialogRef.config.data.academictype, [Validators.required]],
      batch: [this.dialogRef.config.data.batch, [Validators.required]],
      result: [this.dialogRef.config.data.result, [Validators.required]],
      institute: [this.dialogRef.config.data.institute, [Validators.required]],
      affiliation: [this.dialogRef.config.data.affiliation, [Validators.required]],
      location: [this.dialogRef.config.data.location, [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
    });
  }

  ngOnInit() {
    console.log(this.dialogRef.config.data);
  }

  onSave() {
    let qualificationData = this.dialogRef.config.data;
    qualificationData.name = this.userForm.value.name;
    qualificationData.subject = this.userForm.value.subject;
    qualificationData.academictype = this.userForm.value.academictype;
    qualificationData.batch = this.userForm.value.batch;
    qualificationData.result = this.userForm.value.result;
    qualificationData.institute = this.userForm.value.institute;
    qualificationData.affiliation = this.userForm.value.affiliation;
    qualificationData.location = this.userForm.value.location;

    let username = JSON.parse(localStorage.getItem('currentUser'))['username'];
    console.log(qualificationData.name)
    let q: any[] = [];
    q.push(qualificationData);
    console.log(q[0]);
    this.http.patch('/profile', { data: qualificationData, username: username, sectionName: 'qualifications' })
      .subscribe((response: Response) => {
        console.log('-->', response['_body']);
        if (response['_body']) {
          console.log('yes');
          this.router.navigate(['/login']);
          this.data.openSnackBar('Successfully Updated', '');
        }
      });
  }
}

