import * as firebase from "firebase";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import * as fromApp from '../store/app.reducers';
import * as AuthActions from '../auth/store/auth.actions';

@Injectable()
export class AuthService {
  private token: string;

  constructor(private router: Router, private store: Store<fromApp.AppStates>) { }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.store.dispatch(new AuthActions.Signup());
        firebase.auth().currentUser.getIdToken()
          .then(
            (token: string) => {
              // this.token = token;
              this.store.dispatch(new AuthActions.SetToken(token));
            }
          );
      })
      .catch(
        error => console.log(error)
      );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.store.dispatch(new AuthActions.Signin());
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                // this.token = token;
                this.store.dispatch(new AuthActions.SetToken(token));
              }
            );
          this.router.navigate(['/']);
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  signoutUser() {
    firebase.auth().signOut();
    // this.token = null;
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/']);
  }

  /* Unnecessary now */
  // getToken() {
  //   firebase.auth().currentUser.getIdToken()
  //   .then(
  //     (token: string) => {
  //       this.token = token;
  //     }
  //   );
  //   return this.token;
  // }

  // isAuthenticated() {
  //   return this.token != null;
  // }
}