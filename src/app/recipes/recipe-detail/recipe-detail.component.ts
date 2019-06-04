import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as fromApp from '../../store/app.reducers';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  recipeIndex: number;

  constructor(private recipeService: RecipeService, 
    private route: ActivatedRoute, private router: Router,
    private store: Store<fromApp.AppStates>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeIndex = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.recipeIndex);
        if(!this.recipe) {
          this.router.navigate(['/recipes']);
        }
      }
    );
  }

  addToShoppingList() {
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  editRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeIndex);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
