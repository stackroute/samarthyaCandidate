import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';



@Component({
  selector: 'workExperience-form',
  templateUrl: './workExperienceForm.component.html',
  styleUrls: ['./workExperienceForm.component.css']
})
export class WorkExperienceForm implements OnInit {

  public userForm: FormGroup;
  public infoobj: any;
  public timer: any;
  public loading = false;
  public status=false;

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    public dialogRef: MdDialogRef<WorkExperienceForm>
  ) {
    this.userForm = fb.group({
      workplace: [this.dialogRef.config.data.workplace, [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
      designation: [this.dialogRef.config.data.designation, [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
      jobrole: [this.dialogRef.config.data.jobrole, [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
      location: [this.dialogRef.config.data.location, [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
      from: [this.dialogRef.config.data.from, [Validators.required, Validators.pattern('[0-9]{4}')]],
      till: [this.dialogRef.config.data.till, [Validators.required, Validators.pattern('[0-9]{4}')]],

    });
  }

  ngOnInit() {
    console.log(this.dialogRef.config.data);


  }

  onSave() {

    let workExperienceData = this.dialogRef.config.data;
    workExperienceData.workplace = this.userForm.value.workplace;
    workExperienceData.designation = this.userForm.value.designation;
    workExperienceData.jobrole = this.userForm.value.jobrole;
    workExperienceData.location = this.userForm.value.location;
    workExperienceData.from = this.userForm.value.from;
    workExperienceData.till = this.userForm.value.till;
    console.log(workExperienceData)
    // console.log(this.userForm.value);
  }
  // workingStatus(){
  //   if (this.status === true) {
  //     this.status = false;
  //   } else {
  //     this.status = true;
  //   }
  // }
}
