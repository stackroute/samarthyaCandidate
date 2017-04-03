import { getTestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SamProfileCardService {

  constructor(private http: Http, private router: Router) { }

  public getProfileCard(username: string) {
    let profileData: any;
    return this.http.get('/profile?username=' + username).map((response: Response) => {
      profileData = response.json();
      profileData = profileData['data'][0];
      let skills: any[] = [];
      profileData.skills.forEach((element: any) => {
        skills.push(element.name);
      });

      let samCardData = {
        profilepic: './../../' + profileData.profilePic,
        name: profileData.personalInfo.name,
        email: profileData.personalInfo.email,
        profession: '',
        role: profileData.profession.toUpperCase(),
        mobileNumber: profileData.personalInfo.contact.I,
        currentCompany: '',
        experience: '',
        skills: skills,
        location: profileData.personalInfo.address.district + ', ' + profileData.personalInfo.address.pincode,
      };
      return samCardData;
    });
  }
}
