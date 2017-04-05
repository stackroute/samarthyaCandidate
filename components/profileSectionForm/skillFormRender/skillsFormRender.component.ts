import { Component, OnInit, Inject,Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'skills-form-render',
  templateUrl: './skillsFormRender.component.html',
  styleUrls: ['./skillsFormRender.component.css']
})
export class SkillsFormRender implements OnInit {

  public userForm: FormGroup;
  public infoobj: any;
  public timer: any;
  public loading = false;
  public skills1 :Array<any>;
  @Input()
  public skills : Array<any>;
  @Input()
  public skillsData : any;

public expertise="BEGINNER";

  @Input()
  public result:any=[];
  levels = [
    {name : 'BEGINNER', value : 'Beginner'},
    {name : 'MODERATE', value : 'Moderate'},
     {name : 'EXPERT', value : 'Expert'},

  ] ;
  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
  ) {
    this.userForm = fb.group({
      name: ['', [Validators.required]],
      experience: ['', [Validators.required, Validators.pattern('[0-9]{0,3}')]],
      expertise: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
    });
  }

  ngOnInit() { 
  }
onSave()
{
    let skillsData = {name:'',experience:'',expertise:''};
    if(this.userForm.value.name===null||this.userForm.value.name===undefined||
    this.userForm.value.experience===null||this.userForm.value.experience===undefined
    ||this.userForm.value.expertise===null||this.userForm.value.expertise===undefined)
    {
      console.log("Skill name is required");
    }
    else{
    skillsData.name = this.userForm.value.name;
    skillsData.experience = this.userForm.value.experience;
    skillsData.expertise = this.userForm.value.expertise;
    this.result.push(skillsData);
    }
}



  
}

