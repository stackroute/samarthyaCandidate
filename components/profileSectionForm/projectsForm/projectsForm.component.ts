import { ProjectsFormRender } from './projectsFormRender/projectsFormRender.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'projects-form',
  templateUrl: './projectsForm.component.html',
  styleUrls: ['./projectsForm.component.css']
})
export class ProjectsForm implements OnInit {
  public projectsValue:any;
  
  constructor(public dialogRef: MdDialogRef<ProjectsForm>) {}

  ngOnInit() {
    this.projectsValue=this.dialogRef.config.data;
  }
  
}


