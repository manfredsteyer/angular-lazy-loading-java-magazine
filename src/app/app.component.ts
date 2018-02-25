import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  constructor(
    private oauthService: OAuthService,
    private router: Router,
    private translate: TranslateService
  ) {
    
    this.translate.addLangs(['en', 'de']);
    this.translate.setDefaultLang('de');
    this.translate.use('de');

      
    router.events.subscribe( e => console.debug('event', e));

    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();


  }
}

