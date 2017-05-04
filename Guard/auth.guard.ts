import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import {AuthenticationService} from './../services/authentication.service'
// auhentication gaurd if without login user will try to access differnt menu links navigate it to login page

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private http: Http, private AuthenticationService:AuthenticationService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (localStorage.getItem('currentUser')) {
            // logged in user return true
            return this.http.post('/authenticateToken', { token: this.AuthenticationService.getToken() })
                .map((response: Response) => {
                    this.AuthenticationService.setToken(response.json().authToken);
                    return true;
                });
        }
        else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            // this.data.openSnackBar('Please Login!!',"OK");
            return false;
        }
    }
}