import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Data } from './../services/data.service';
import { AuthenticationService } from './../services/authentication.service'
import { Observable } from 'rxjs/Observable'; // http request using observable

// auhentication gaurd if without login user will try to access differnt menu links navigate it to login page

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private data: Data, private http: Http, private AuthenticationService: AuthenticationService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            this.activated().subscribe((response: any) => {
                if (response.json().success != false) {
                    this.AuthenticationService.setToken(response.json().authToken);
                    return true;
                }
                else {
                    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                    this.data.openSnackBar('Please Login!!', "OK");
                    return false;
                }
            }, (err) => {
                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                this.data.openSnackBar('Please Login!!', "OK");
                return false;
            })
        }
        else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            this.data.openSnackBar('Please Login!!', "OK");
            return false;
        }

        return true;
    }

    activated() {
        // logged in user return true
        return this.http.post('/authenticateToken', { token: this.AuthenticationService.getToken() })
            .map((response: Response) => {
                return response;
            });
    }
}