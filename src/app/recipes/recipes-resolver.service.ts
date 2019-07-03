import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, tap, take, switchMap } from 'rxjs/operators';

import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import * as fromApp from '../store/app.reducers';
import * as recipesActions from "../recipes/store/recipes.action";
import { Actions, ofType } from "@ngrx/effects";
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>,
    private action$: Actions) { }

  /* Resolver will be executed before the component is loaded, in this case will load data */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // if(this.recipeService.getRecipes().length === 0) {
    //   return this.dataStorageService.getRecipes();
    // }
    return this.store.select('recipes').pipe(
      take(1),
      map(recipesState => recipesState.recipes),
      switchMap(recipes => {
        // console.log('resolver', recipes)
        if (recipes.length === 0) {
          this.store.dispatch(new recipesActions.FetchRecipes());
          return this.action$.pipe(ofType(recipesActions.actionType.SYNC_RECIPES), take(1))
        }else {
          return of(recipes);
        }
      })
    )
  }
}