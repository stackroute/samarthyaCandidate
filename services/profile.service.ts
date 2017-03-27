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
    return this.http.get('http://localhost:3001/personalInfo').map((response: Response) => response.json());
  }

  public getProfileData(username: string) {


    return {
      "personalInfo": {
        "displayname": "Divesh Sankhla",
        "fname": "Divesh",
        "lname": "Sankhla",
        "gender": "male",
        "email": "sankhlasaini@gmail.com",
        'dob': '11-11-1992',
        'altemail': 'muruga55@gmail.com',

        "address": [
          {
            "address1": 'Vijay Nagar',
            "address2": 'Scheme No-4',
            "landmark": "Railway Station Alwar",
            "district": " Alwar",
            "state": "RAJASTHAN",
            "pincode": "301001",
          },
          {
            "address1": 'Nagar',
            "address2": '4',
            "landmark": "sajdkajhdkasjd",
            "district": " dskfjhksdfksdjf",
            "state": "ksadlasjdlsajdlasd",
            "pincode": "301001",
          }
        ],
        "contact": {
          "I": "99123499123",
          "II": "12312312333"
        },
        "married": true,
        "preLang": "English",
        "nativeLang": "Hindi",
        "lang": [{
          "name": "Hindi",
          "r": true,
          "w": true,
          "s": true,
        }, {
          "name": "English",
          "r": true,
          "w": true,
          "s": false,
        }
        ]
      }
    }
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
