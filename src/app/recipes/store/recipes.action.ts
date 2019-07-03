import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';


export enum actionType {
  FETCH_RECIPES = '[Recipes] Fetch Recipes',
  SYNC_RECIPES = '[Recipes] Sync Recipes',
  STORE_RECIPES = '[Recipes] Store Recipes',
  ADD_RECIPE = '[Recipes] Add Recipe',
  UPDATE_RECIPE = '[Recipes] Update Recipe',
  DELETE_RECIPE = '[Recipes] Delete Recipe',
  ERROR_MESSAGE = '[Recipes] Error Message',
}

export class FetchRecipes implements Action {
  readonly type = actionType.FETCH_RECIPES;
  constructor() { }
}
export class SyncRecipes implements Action {
  readonly type = actionType.SYNC_RECIPES;
  constructor(public recipes: Recipe[]) { }
}
export class StoreRecipes implements Action {
  readonly type = actionType.STORE_RECIPES;
  constructor() { }
}
export class AddRecipe implements Action {
  readonly type = actionType.ADD_RECIPE;
  constructor(public recipe: Recipe) { }
}
export class UpdateRecipe implements Action {
  readonly type = actionType.UPDATE_RECIPE;
  constructor(public payload: {index: number, recipe: Recipe}) { }
}
export class DeleteRecipe implements Action {
  readonly type = actionType.DELETE_RECIPE;
  constructor(public index: number) { }
}
export class ErrorMessage implements Action {
  readonly type = actionType.ERROR_MESSAGE;
  constructor(public message: string) { }
}

export type RecipesActions = AddRecipe
  | FetchRecipes
  | SyncRecipes
  | StoreRecipes
  | ErrorMessage
  | UpdateRecipe
  | DeleteRecipe