import { getTestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {

  constructor(private http: Http, private router: Router) { }

  read(username: string) {
    return this.http.get('/profile?username=' + username).map((response: Response) => response.json());
  }

  // this will get profile data of user
  public getProfileData(username: string) {

    return {
      'personalInfo': {
        'displayname': 'Divesh Sankhla',
        'fname': 'Divesh',
        'lname': 'Sankhla',
        'gender': 'male',
        'email': 'sankhlasaini@gmail.com',
        'dob': '11-11-1992',
        'altemail': 'muruga55@gmail.com',

        'address': [
          {
            'address1': 'Vijay Nagar',
            'address2': 'Scheme No-4',
            'landmark': 'Railway Station Alwar',
            'district': ' Alwar',
            'state': 'RAJASTHAN',
            'pincode': '301001',
          },
          {
            'address1': 'Nagar',
            'address2': '4',
            'landmark': 'sajdkajhdkasjd',
            'district': ' dskfjhksdfksdjf',
            'state': 'ksadlasjdlsajdlasd',
            'pincode': '301001',
          }
        ],
        'contact': {
          'I': '99123499123',
          'II': '12312312333'
        },
        'married': true,
        'preLang': 'English',
        'nativeLang': 'Hindi',
        'lang': [{
          'name': 'Hindi',
          'r': true,
          'w': true,
          's': true,
        }, {
          'name': 'English',
          'r': true,
          'w': true,
          's': false,
        }
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
        'name': 'J2EEE',
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
        'roles': [
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
          'duration': 2,
          'role': 'Developer',
          'skill': 'Angular',
          'location': 'Bangalore'
        },
        {
          'name': 'BOB',
          'duration': 1,
          'role': 'Tester',
          'skill': 'React',
          'location': 'Pune'
        }
      ]

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
