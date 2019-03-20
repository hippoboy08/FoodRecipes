import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'section6';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    firebase.initializeApp({
      apiKey: "AIzaSyD5yzCKgIX9v6l91Y3NJ_mDOc8pXXlArXE",
      authDomain: "recipe-book-c0342.firebaseapp.com",
    });
  }
}
