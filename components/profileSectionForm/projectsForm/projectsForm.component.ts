import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Data } from './../../../services/data.service';
import 'rxjs/add/operator/map';


@Component({
  selector: 'projects-form',
  templateUrl: './projectsForm.component.html',
  styleUrls: ['./projectsForm.component.css']
})
export class ProjectsForm implements OnInit {

  public userForm: FormGroup;
  public infoobj: any;
  public timer: any;
  public emailId = '';
  public loading = false;
  public projectObj = {};
  constructor(
    @Inject(FormBuilder) fb: FormBuilder, private router: Router, private data: Data, private http: Http,
    public dialogRef: MdDialogRef<ProjectsForm>
  ) {
    this.userForm = fb.group({
      name: [this.dialogRef.config.data.name, [Validators.required]],
      durFrom: [this.dialogRef.config.data.duration, [Validators.required]],
      durTo: [this.dialogRef.config.data.duration, [Validators.required]],
      location: [this.dialogRef.config.data.location, [Validators.required]],
      skills: [this.dialogRef.config.data.skills, [Validators.required]],
      role: [this.dialogRef.config.data.role, [Validators.required]]
    });
  }

  ngOnInit() {
    console.log(this.dialogRef.config.data);
  }

  onSave() {

    let projectsData = this.dialogRef.config.data;
    projectsData.name = this.userForm.value.name;
    projectsData.durFrom = this.userForm.value.durFrom;
    projectsData.durTo = this.userForm.value.durTo;
    projectsData.location = this.userForm.value.location;
    let skillsArray = this.userForm.value.skills.split(',');
    projectsData.skills = skillsArray;
    projectsData.role = this.userForm.value.role;
    this.projectObj = {
      "name": projectsData.name,
      "duration":{"start": projectsData.durFrom,
                   "end": projectsData.durTo},
      "location": projectsData.location,
      "skills": skillsArray,
      "jobRole": projectsData.role
    }

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.http.patch('/profile', { sectionName: "projects", username: currentUser.username, data: this.projectObj })
      .subscribe((response: Response) => {
        let res = response.json();
        console.log(res)
        if (res.success == true) {
          this.data.openSnackBar("Successfully updated", "OK");
          this.router.navigate(['/home']);
        }
        else {
          this.data.openSnackBar("Techical Error", "Try later");
        }
      },
      err => {
        this.data.openSnackBar("Techical Error", "Try later");

      });

  }
}

