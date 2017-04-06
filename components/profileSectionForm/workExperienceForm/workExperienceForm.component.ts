import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import {WorkExperienceFormRender}from './workExperienceFormRender/workExperienceFormRender.component';

@Component({
  selector: 'workExperienceForm-form',
  templateUrl: './workExperienceForm.component.html',
  styleUrls: ['./workExperienceForm.component.css']
})
export class WorkExperienceForm implements OnInit {
public workExperienceValue:any;
  
  constructor(public dialogRef: MdDialogRef<WorkExperienceForm>) {}

 ngOnInit() {
    this.workExperienceValue=this.dialogRef.config.data;  
  }
}