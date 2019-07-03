import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";

import * as firebase from "firebase";
import { AuthService } from './auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'section6';

  constructor(private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    firebase.initializeApp({
      apiKey: environment.firebaseAPIKey,
      authDomain: environment.firebaseAuthDomain,
    });

    /* This use browser-only feature(localStorage) which will not be available for server-side redering,
      then only run if the app is running in browser, not in the pre-redering phrase on the server */
    if (isPlatformBrowser(this.platformId)) {
      this.authService.rememberLogin();
    }
  }
}
