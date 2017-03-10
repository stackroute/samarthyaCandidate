import { CandidateRegisterComponent } from './../components/loginComponent/candidate-register/candidate-register.component';
// import { EmailService } from 'app/services/email.service';
import { LoginComponent } from 'app/components/loginComponent/login/login.component';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EmailService {
  private _url = 'http://localhost:3000/email';

  public ref: LoginComponent;

  constructor(private _http: Http) { }

  postdata(mailObj: LoginComponent) {
    const mailObjString = JSON.stringify(mailObj);
    const params = 'json=' + mailObjString;
    const headers = new Headers();

    headers.append('Content-Type', 'application/X-www-form-urlencoded');
    return this._http.post(this._url, params, {
      headers: headers
    }).map(res => res.json());
  }
  postdata2(mailObj: CandidateRegisterComponent) {
     const mailObjString = JSON.stringify(mailObj);
    const params = 'json=' + mailObjString;
    const headers = new Headers();

    headers.append('Content-Type', 'application/X-www-form-urlencoded');
    return this._http.post('http://localhost:3000/email/welcome', params, {
      headers: headers
    }).map(res => res.json());
  }
  postdata3(mailObj: CandidateRegisterComponent) {
     const mailObjString = JSON.stringify(mailObj);
    const params = 'json=' + mailObjString;
    const headers = new Headers();

    headers.append('Content-Type', 'application/X-www-form-urlencoded');
    return this._http.post('http://localhost:3000/email/reset', params, {
      headers: headers
    }).map(res => res.json());
  }


  getRegister() {
    return <any>this._http.get('http://localhost:3000/email/verifiedmail')
      .map((response: Response) => {
        return response.json();
      });
  }
}
