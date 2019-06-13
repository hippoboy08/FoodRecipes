import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor (private dataStorageService: DataStorageService,
    private recipeService: RecipeService) {}

  /* Resolver will be executed before the component is loaded, in this case will load data */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.recipeService.getRecipes().length === 0) {
      return this.dataStorageService.getRecipes();
    }
  }
}