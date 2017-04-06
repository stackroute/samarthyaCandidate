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

 public qualificationValue : any;

  constructor(private http: Http, public dialogRef: MdDialogRef<QualificationForm>) {
  }

  ngOnInit() {
    console.log(this.dialogRef.config.data);
    this.qualificationValue = this.dialogRef.config.data; 
  }

}

