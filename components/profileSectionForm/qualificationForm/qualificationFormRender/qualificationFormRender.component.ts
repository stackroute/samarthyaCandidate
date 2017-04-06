import { Data } from './../../../../services/data.service';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Component, OnInit, Inject ,Input} from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'qualification-form-render',
  templateUrl: './qualificationFormRender.component.html',
  styleUrls: ['./qualificationFormRender.component.css'],
})

export class QualificationFormRender implements OnInit {
 public userForm: FormGroup;

   @Input()
  public qualificationsData: any[];

constructor(private fb: FormBuilder, private http: Http, private router: Router, private data: Data) {
  }
   ngOnInit() {
      console.log(this.qualificationsData)
    if (this.qualificationsData.length > 0) {
      this.userForm = this.fb.group({
        AllQualifications: this.fb.array(this.initQualificationsFormWithData())
      });
    } else {
      this.userForm = this.fb.group({
        AllQualifications: this.fb.array([this.initQualificationsForm()])
      });
    }
  }

initQualificationsFormWithData() {
 

    let qualificationEntries = this.qualificationsData.map((qualification) => {
      return this.fb.group({
        name: [qualification.name, [Validators.required]],
      subject: [qualification.subject, [Validators.required]],
      academictype: [qualification.academictype, [Validators.required]],
      batch: [qualification.batch.substring(0, 10), [Validators.required]],
      result: [qualification.result, [Validators.required]],
      institute: [qualification.institute, [Validators.required]],
      affiliation: [qualification.affiliation, [Validators.required]],
      location: [qualification.location, [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
    });
    });

    return qualificationEntries;
  }

 initQualificationsForm() {
   console.log("cccc")
   return this.fb.group({
       name: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      academictype: ['', [Validators.required]],
      batch: ['', [Validators.required]],
      result: ['', [Validators.required]],
      institute: ['', [Validators.required]],
      affiliation: ['', [Validators.required]],
      location: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
    });
  }
  addQualifications() {
    const control = <FormArray>this.userForm.controls['AllQualifications'];
    control.push(this.initQualificationsForm());
  }

  removeQualifications(i: number) {
    const control = <FormArray>this.userForm.controls['AllQualifications'];
    control.removeAt(i);
  }


onSave() {
    console.log("000000000000000000");
    let sectionName = "qualifications";
    let currentuser = JSON.parse(localStorage.getItem('currentUser'));
    this.http.patch('/profile', { sectionName: sectionName, username: currentuser.username, data: this.userForm.value.AllQualifications })
      .subscribe((response) => {
        let res = response.json();
        if (res.success) {
          this.data.openSnackBar("Successfully updated", "OK");
          this.router.navigate(['/login']);
        }
        else {
          this.data.openSnackBar("Not updated", "Try later");
          this.router.navigate(['/login']);
        }

      }, (err) => {
        this.data.openSnackBar("Technical Error", "Try again");

      });

  }
}
