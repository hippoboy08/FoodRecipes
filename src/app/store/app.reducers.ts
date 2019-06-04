import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppStates {
  shoppingList: fromShoppingList.State,
  auth: fromAuth.State
}

export const appReducers: ActionReducerMap<AppStates> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer
}