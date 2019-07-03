import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import * as recipesActions from './recipes.action';
import { Recipe } from '../recipe.model';
import * as fromApp from "../../store/app.reducers";
import { dispatch } from 'rxjs/internal/observable/range';

const databaseURL: string = 'https://recipe-book-c0342.firebaseio.com';

@Injectable()
export class RecipesEffects {
  @Effect() fetchRecipes = this.action.pipe(
    ofType(recipesActions.actionType.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(databaseURL + '/recipes.json', {
        observe: 'body',
        responseType: 'json' //default, don't need to define
      })
        .pipe(
          map(
            (response: Recipe[]) => {
              let recipes = response;
              recipes = recipes.map(recipe => {
                return {
                  ...recipe,
                  ingredients: recipe.ingredients ? recipe.ingredients : []
                }
              })
              return new recipesActions.SyncRecipes(recipes)
            }
          ),
          catchError((error) => {
            console.log('Recipe Effect', error);
            return of(new recipesActions.ErrorMessage(error.error.error));
          })
        )
    })
  )
  @Effect() storeRecipes = this.action.pipe(
    ofType(recipesActions.actionType.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([storeRecipeAction, recipesState]) => {
      return this.http.put(databaseURL + '/recipes.json', recipesState.recipes)
        .pipe(
          map((response: Recipe[]) => {
            // console.log('recipe effect - store recipes:', response)
            return new recipesActions.SyncRecipes(response)
          }),
          catchError((error) => {
            console.log('Recipe Effect', error);
            return of(new recipesActions.ErrorMessage(error.error.error));
          })
        )
    })
  )

  constructor(private action: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) { }
}