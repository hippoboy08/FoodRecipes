import * as AuthActions from "./auth.actions";
import { User } from '../user.model';


export interface State {
  // token: string;
  authenticated: boolean;
  user: User;
  errorMessage: string;
  isLoading: boolean;
}

const initialState: State = {
  // token: null,
  authenticated: false,
  errorMessage: null,
  isLoading: false,
  user: null
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.SIGN_UP_START:
    case AuthActions.SIGN_IN_START:
      return {
        ...state,
        isLoading: true,
        errorMessage: null
      }
    case AuthActions.AUTH_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.message,
        user: null
      }
    case AuthActions.SIGNED_IN:
      const user = new User(
        action.payload.email,
        action.payload.token,
        action.payload.userId,
        action.payload.expirationDate
      );
      return {
        ...state,
        isLoading: false,
        authenticated: true,
        errorMessage: null,
        user: user
      }
    case AuthActions.LOG_OUT:
      return {
        ...state,
        // token: null,
        user: null,
        authenticated: false
      }
    // case AuthActions.SET_TOKEN:
    //   return {
    //     ...state,
    //     token: action.payload,
    //   }
    default:
      return state;
  }
}