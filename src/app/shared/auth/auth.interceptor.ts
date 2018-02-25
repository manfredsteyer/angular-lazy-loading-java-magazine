import { Injectable } from '@angular/core';
import { OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private storage: OAuthStorage) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if (req.url.startsWith('http://www.angular.at')) {
            let headers = req.headers
                                .set('Authorization', 'Bearer ' + this.storage.getItem('access_token'));
            
            req = req.clone({ headers });
        }

        return next.handle(req).do(event => {console.debug('http-event', event)});
    
    }
}