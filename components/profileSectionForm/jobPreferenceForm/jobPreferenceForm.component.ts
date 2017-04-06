import { JobPreferenceFormRender } from './jobPreferenceFormRender/jobPreferenceFormRender.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'jobPreference-form',
  templateUrl: './jobPreferenceForm.component.html',
  styleUrls: ['./jobPreferenceForm.component.css']
})
export class JobPreferenceForm implements OnInit {
  public jobPreferenceValue:any;
  
  constructor(public dialogRef: MdDialogRef<JobPreferenceForm>) {}

  ngOnInit() {
    this.jobPreferenceValue=this.dialogRef.config.data.jobRoles;
  }
  
}
