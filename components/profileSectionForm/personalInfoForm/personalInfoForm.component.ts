import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'personalInfo-form',
  templateUrl: './personalInfoForm.component.html',
  styleUrls: ['./personalInfoForm.component.css']
})
export class PersonalInfoForm implements OnInit {

  constructor(public dialogRef: MdDialogRef<PersonalInfoForm>) {
    console.log('data', this.dialogRef.config.data)
  }

  ngOnInit() {

  }
}
