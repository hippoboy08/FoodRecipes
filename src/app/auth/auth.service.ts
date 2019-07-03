import * as firebase from "firebase";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import * as fromApp from '../store/app.reducers';
import * as AuthActions from '../auth/store/auth.actions';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

@Injectable()
export class AuthService {
  user = new BehaviorSubject<User>(null);
  error = new Subject<any>();
  private token: string;

  constructor(private router: Router, private store: Store<fromApp.AppState>) { }

  signupUser(email: string, password: string) {
    /* firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        firebase.auth().currentUser.getIdTokenResult()
          .then(
            (result) => {
              // this.token = token;
              this.handleUser(result.claims.email, result.token, result.claims.user_id, new Date(result.expirationTime));
              // this.store.dispatch(new AuthActions.SetToken(result.token));
            }
          );
      })
      .catch(
        error => console.log(error)
      ); */
    this.store.dispatch(new AuthActions.SignupStart({ email: email, password: password }));
  }

  signinUser(email: string, password: string) {
    /*
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          // this.store.dispatch(new AuthActions.Signin());
          firebase.auth().currentUser.getIdTokenResult()
            .then(
              (result) => {
                // this.token = token;
                // console.log(result, new Date(result.expirationTime));
                this.handleUser(result.claims.email, result.token, result.claims.user_id, new Date(result.expirationTime));
                // this.store.dispatch(new AuthActions.SetToken(result.token));
              }
            );
          this.router.navigate(['/']);
        }
      )
      .catch(
        error => {
          // console.log(error);
          this.error.next(error);
        }
      ); */
    this.store.dispatch(new AuthActions.SigninStart({ email: email, password: password }));
  }

  private handleUser(email: string, token: string, user_id: string, expiresIn: Date) {
    const user = new User(email, token, user_id, expiresIn);
    // this.user.next(user);
    this.store.dispatch(new AuthActions.Signedin({ email: user.email, userId: user.id, token: user.token, expirationDate: user.expirationDate }));
    /* Save user info to localStorage for remember login */
    // localStorage.setItem('userData', JSON.stringify(user));
  }

  /* auto login when the app is reloaded and the token is still valid */
  public rememberLogin() {
    const userData = JSON.parse(localStorage.getItem('userCredentials'));
    if (!userData || new Date(userData.user._tokenExpirationDate) < new Date()) {
      return;
    } else {
      // console.log('userdata:', userData, new Date(userData.user._tokenExpirationDate), new Date(), new Date(userData.user._tokenExpirationDate) < new Date());
      this.store.dispatch(new AuthActions.Signedin({
        email: userData.user.email,
        userId: userData.user.id,
        token: userData.user._token,
        expirationDate: new Date(userData.user._tokenExpirationDate)
      },
        false
      ));
    }
  }

  signoutUser() {
    firebase.auth().signOut().then(() => {
      // this.token = null;
      /* release userData from localStorage when log out */
      localStorage.removeItem('userCredentials');
      this.store.dispatch(new AuthActions.Logout());
      // this.router.navigate(['/auth']);
    });
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