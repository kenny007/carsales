// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';

(window as any).global = window;

@Injectable()
export class AuthService {
  profile: any;


  auth0 = new auth0.WebAuth({
    clientID: 's0EU4jh5aKV2RiV8p2mCxV39bgFA6dTQ',
    domain: 'carsale.auth0.com',
    responseType: 'token id_token',
    audience: 'https://carsale.auth0.com/userinfo',
    redirectUri: 'http://localhost:3000/callback',
    scope: 'openid profile'
  });

  constructor(public router: Router) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
    const accessToken = localStorage.getItem('access_token');
    
    if(accessToken){
      const self = this;

      if(!self.profile){
      this.auth0.client.userInfo(accessToken, (err, profile) => { 
      debugger;
      
      localStorage.setItem('profile', JSON.stringify(profile))
      self.profile = profile;
      //cb(err, profile);
      (err, profile) => {
        if (err) throw err
        }
       });
      }
    }

  }

  public login(): void {
    console.log(auth0);
    this.auth0.authorize(); //this displays a login widget
  }

    // ...
    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            window.location.hash = '';
            console.log(authResult)
            this.setSession(authResult);
            this.router.navigate(['/vehicles']);
          } else if (err) {
            this.router.navigate(['/vehicles']);
            console.log(err);
          }
        });
      }
    
      private setSession(authResult): void {
        // Set the time that the Access Token will expire at
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        localStorage.setItem('profile', JSON.stringify(authResult.idTokenPayload));
        this.profile = null;
        //console.log(authResult);
      }
    
      public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        localStorage.removeItem('expires_at');
        // Go back to the home route
        this.router.navigate(['/']);
      }
    
      public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // Access Token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
        return new Date().getTime() < expiresAt;
      }
    

}



