import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    firebase.initializeApp({
      apiKey: environment.firebaseAPIKey,
      authDomain: environment.firebaseAuthDomain,
    });

    this.authService.rememberLogin();
  }
}
