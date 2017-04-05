import { SkillsFormRender } from './skillFormRender/skillsFormRender.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'skills-form',
  templateUrl: './skillsForm.component.html',
  styleUrls: ['./skillsForm.component.css']
})
export class SkillsForm implements OnInit {
  public skillsValue:any;
  
  constructor(public dialogRef: MdDialogRef<SkillsForm>) {}
dialog():MdDialog{
  
}
  ngOnInit() {
    this.skillsValue=this.dialogRef.config.data;
  }
  
}

