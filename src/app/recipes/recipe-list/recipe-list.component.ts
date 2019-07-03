import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from "../recipe.model";
import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducers';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService, private router: Router,
    private route: ActivatedRoute, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // this.recipes = this.recipeService.getRecipes();
    this.store.select('recipes').pipe(
      map(recipesState => recipesState.recipes)
    ).subscribe(recipes => {
      this.recipes = recipes;
    })
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  createNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
