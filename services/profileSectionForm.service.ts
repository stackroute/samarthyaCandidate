import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileSectionFormService {
  private url: string = '';
  //   public data2 :LoginComponent  ;
  constructor(private http: Http) { }
  editJobPreference(sectionName,modifyObj: any) {
    this.url = '/profile';
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    return this.http.patch(this.url, {sectionName:sectionName,username:currentUser.username,modifyObj:modifyObj}).map((response: Response) => response.json());
  };

}