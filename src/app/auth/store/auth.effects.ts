import { Effect, Actions, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";

import * as AuthActions from "./auth.actions";
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { pipe, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const postAuthenticated = (responseData: AuthResponseData) => {
  const expirationDate = new Date(new Date().getTime() + (+responseData.expiresIn*1000));
  // const expirationDate = new Date(new Date().getTime() - (+responseData.expiresIn*1000));
  // console.log('Auth Effect Log:',responseData);
  const user = new User(responseData.email, responseData.idToken, responseData.localId, expirationDate);
  /* Save user info to localStorage for remember login */
  localStorage.setItem('userCredentials', JSON.stringify({ user }));
  return new AuthActions.Signedin({
    userId: responseData.localId,
    email: responseData.email,
    token: responseData.idToken,
    expirationDate: expirationDate
  })
};
const handleError = (message: string) => {
  return of(new AuthActions.AuthFailed(message));
};

@Injectable()
export class AuthEffects {
  @Effect() authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGN_UP_START),
    switchMap((requestData: AuthActions.SignupStart) => {
      return this.http.post<AuthResponseData>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + environment.firebaseAPIKey, {
        email: requestData.payload.email,
        password: requestData.payload.password,
        returnSecureToken: true
      }).pipe(
        map((resData: AuthResponseData) => {
          return postAuthenticated(resData);
        }),
        catchError(errorResponse => {
          // console.log('Auth Effect Log:',error.error.error.message);
          return handleError(errorResponse.error.error.message);
        })
      )
    })
  )

  @Effect() authSignin = this.actions$.pipe(
    ofType(AuthActions.SIGN_IN_START),
    switchMap((authData: AuthActions.SigninStart) => {
      return this.http.post<AuthResponseData>
        ('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='
          + environment.firebaseAPIKey, {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          })
        .pipe(
          map((resData: AuthResponseData) => {
            return postAuthenticated(resData);
          }),
          catchError(errorResponse => {
            // console.log('Auth Effect Log:',error.error.error.message);
            return handleError(errorResponse.error.error.message);
          })
        )
    })
  );

  /* This effect will not dispatch any action at the end (which a normal effect does),
  only navigate as an interceptor when user is logged in successfully & 
  the signedin action is dispatched*/
  @Effect({ dispatch: false }) signedIn = this.actions$.pipe(
    ofType(AuthActions.SIGNED_IN),
    tap((signedInAction: AuthActions.Signedin) => {
      if(signedInAction.redirect == true) {
        this.router.navigate(['/']);
      }
    }),
  )

  constructor(private actions$: Actions, private http: HttpClient, private router: Router) { }
}