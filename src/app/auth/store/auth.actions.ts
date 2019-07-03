import { Action } from "@ngrx/store";

export const SIGN_UP_START = '[Auth] SIGN_UP_START';
export const SIGN_IN_START = '[Auth] SIGN_IN_START';
export const SIGN_UP = '[Auth] SIGN_UP';
export const SIGNED_IN = '[Auth] SIGNED_IN';
export const AUTH_FAILED = '[Auth] AUTH_FAILED';
export const LOG_OUT = '[Auth] LOG_OUT';
// export const SET_TOKEN = 'SET_TOKEN';

export class SignupStart implements Action {
  readonly type = SIGN_UP_START;
  constructor(public payload: { email: string, password: string }) { }
}
export class Signedin implements Action {
  readonly type = SIGNED_IN;
  constructor(public payload: { userId: string, email: string, token: string, expirationDate: Date }, public redirect: boolean = true) { }
}
export class SigninStart implements Action {
  readonly type = SIGN_IN_START;
  constructor(public payload: { email: string, password: string }) { }
}
export class AuthFailed implements Action {
  readonly type = AUTH_FAILED;
  constructor(public message: string) { }
}
export class Logout implements Action {
  readonly type = LOG_OUT;
}
// export class SetToken implements Action {
//   readonly type = SET_TOKEN;
//   constructor(public payload: string) { }
// }

export type AuthActions =
  SignupStart
  | SigninStart
  | Signedin
  | AuthFailed
  | Logout
  // | SetToken
  ;