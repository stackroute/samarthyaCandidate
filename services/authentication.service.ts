import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// Service for Authentication
// having two methods login and logout
// If login then set the user in the localstorage.
// if logout remove the user from localstorage.

@Injectable()
export class AuthenticationService {
    public token: string;
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http, private router: Router) {
        // set token if saved in local storage
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<string> {
        return this.http.post('/auth', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json().authToken;
                if (token && response.json().role=='candidate') {
                    // set token property
                    this.token = token;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token}));
                    // return true to indicate successful login
                    return response.json();
                } else {
                    // return false to indicate failed login
                    return response.json();
                }
            });
    }

     getToken() {
        let token = JSON.parse(localStorage.getItem('currentUser'))['token'];
        return token;
    }

    setToken(authToken: any) {
        let token = authToken;
        let username = JSON.parse(localStorage.getItem('currentUser'))['username']
        localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;

        localStorage.removeItem('currentUser');
        this.router.navigate(['/login'])
    }

    getCreatedBy() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
            return currentUser.username;
        }
        else {
            return currentUser;
        }

    }

    checkOldPassword(pass:any, username:any){
        return this.http.post('/auth/check-password', { username:username,oldPassword: pass,token:this.getToken() })
            .map((response: Response) => {
                return response.json();
            });
    }
    
    passwordChange(email: any, password: any) {
        return this.http.post('/auth/reset-password', { username: email, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                return response.json();
            });
    }
    getEmail(token: any) {
        return this.http.post('/auth/verify-email', { token: token })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                return response.json();
            });
    }
}
