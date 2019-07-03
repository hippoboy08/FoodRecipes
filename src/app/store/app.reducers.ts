import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import * as fromRecipes from '../recipes/store/recipes.reducer';

export interface AppState {
  shoppingList: fromShoppingList.State,
  auth: fromAuth.State,
  recipes: fromRecipes.State
}

export const appReducers: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
  recipes: fromRecipes.recipesReducer
}