import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { JsonDataService } from './../../../services/json-data.service';
import { Data } from './../../../services/data.service';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {AuthenticationService} from './../../../services/authentication.service'



@Component({
  selector: 'summary-form',
  templateUrl: './summaryForm.component.html',
  styleUrls: ['./summaryForm.component.css'],
  providers: [JsonDataService]

})
export class SummaryForm implements OnInit {

  public userForm: FormGroup;

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    private JsonDataService: JsonDataService,
    private data: Data,
    public dialogRef: MdDialogRef<SummaryForm>,
    private http: Http,
    private router: Router,
    private authenticationService:AuthenticationService
  ) {
    this.userForm = fb.group({
      summaryText: [this.dialogRef.config.data.summaryText],
    });
  }

  ngOnInit() {
  }

  onSave() {
    let summaryData = this.dialogRef.config.data;
    summaryData.summaryText = this.userForm.value.summaryText;
    let username = JSON.parse(localStorage.getItem('currentUser'))['username'];
    this.http.patch('/profile', { data: summaryData, username: username, sectionName: 'summary', token:this.authenticationService.getToken() })
      .subscribe((response: Response) => {
        this.authenticationService.setToken(response.json().authToken)
        if (response['_body']) {
          this.router.navigate(['/login']);
          this.data.openSnackBar('Successfully Updated', '');
        }
      });
  }
}
