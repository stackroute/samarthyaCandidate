import { getTestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {

  constructor(private http: Http, private router: Router) { }

  // create() {
  //   return this.http.get('')
  //     .map((response: Response) => response.json());
  // }

  read(username) {
    return this.http.get('/profile?username=' + username).map((response: Response) => response.json());
  }

  getProfileConfig() {
    console.log('asdasd');
    return this.http.get('http://localhost:3001/personalInfo').map((response: Response) => console.log(response.json()));
  }

  // update() {
  //   return this.http.get('')
  //     .map((response: Response) => response.json());
  // }

  // delete() {
  //   return this.http.get('')
  //     .map((response: Response) => response.json());
  // }

}
