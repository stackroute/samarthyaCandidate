import { getTestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {

  constructor(private http: Http, private router: Router) { }

  public getProfile(username: string) {
    let profileData: any;
    return this.http.get('/profile?username=' + username).map((response: Response) => {
      profileData = response.json();
      let modifiedData = profileData['data'][0];
      modifiedData['personalInfo']['dob'] = modifiedData['personalInfo']['dob'].substr(0, 10) //modified DATE of BIRTH
      return modifiedData;
    });

  }

  // this will get profile data of user
  public getProfileData(username: string) {

    return { // add center code
      'personalInfo': {
        'name': 'Divesh Sankhla',
        'fname': 'Divesh',
        'lname': 'Sankhla',
        'gender': 'male',
        'email': 'sankhlasaini@gmail.com',
        'dob': '11-11-1992',
        'altemail': 'muruga55@gmail.com',
        'address':
        {
          'address1': 'Vijay Nagar',
          'address2': 'Scheme No-4',
          'landmark': 'Railway Station Alwar',
          'district': ' Alwar',
          'state': 'RAJASTHAN',
          'pincode': '301001',
        },
        'contact': {
          'I': '99123499123',
          'II': '12312312333'
        },
        'married': true,
        'prefLang': 'English',
        'nativeLang': 'Hindi',
        'lang': [
          {
            'name': 'Hindi',
            'r': 'Read',  // 'r': true,
            'w': 'Write',  // 'w': true,
            's': 'Speak',  // 's': true,
          },
          {
            'name': 'English',
            'r': 'Read',  // 'r': true,
            'w': '',  // 'w': true,
            's': 'Speak',  // 's': true,
          },
        ],
      },
      'skills': [{
        'name': 'JAVA',
        expertise: 'moderate',
        experience: 1
      },
      {
        'name': 'ANGULAR JS',
        expertise: 'moderate',
        experience: 2
      }, {
        'name': 'ANGULAR 2',
        expertise: 'moderate',
        experience: 1
      }, {
        'name': 'JAVASCRIPT',
        expertise: 'moderate',
        experience: 3
      }, {
        'name': 'J2EE',
        expertise: 'moderate',
        experience: 2
      }, {
        'name': 'MEAN',
        expertise: 'moderate',
        experience: 1
      }]
      ,
      qualifications: [
        {
          name: 'M.tech',
          subject: 'Electronics',
          academictype: 'Master',
          batch: '2016',
          result: { score: '80', unit: '%' },
          institute: 'IIT Delhi',
          affiliation: 'IIT Delhi',
          location: 'Delhi'
        },
        {
          name: 'B.tech',
          subject: 'Computer Science',
          academictype: 'Bachelor',
          batch: '2014',
          result: { score: '70', unit: '%' },
          institute: 'Punjabi university',
          affiliation: 'Punjabi university',
          location: 'Patiala'
        }
      ],
      experiences: [
        {
          workplace: 'TCS',
          designation: 'Engineer',
          role: 'Software Dev',
          location: 'bangalore',
          duration: {
            start: '11/02/2012',
            end: '20/10/2016'
          },
          iscurrent: false
        },
        {
          workplace: 'Wipro',
          designation: 'Engineer',
          role: 'Tester',
          location: 'bangalore',
          duration: {
            start: '11/05/2016',
            end: '11/07/2017'
          },
          iscurrent: true
        }
      ],
      'jobPreferences': {
        'looking': 'Looking For Job',
        'jobRoles': [
          {
            'name': 'Team Lead',
            'engagement': 'Full Time',
            'expectedSal': {
              'min': 50000,
              'max': 100000000
            },
            'skills': ['Angular 2', 'Node JS'],
            'availablefrom': '10/04/2017',
            'locations': ['Bangalore', 'pune', 'chennai']
          }
        ]
      },

      'projects': [
        {
          'name': 'Samarth',
          'role': 'Developer',
          'skill': 'Angular',
          'location': 'Bangalore',
          'jobRole': 'Project Engineer'
        }
      ],
      'summary': {
        "summaryText": 'summary sill come here'
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
