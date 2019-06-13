import { Injectable } from "@angular/core";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    // new Recipe('Spring rolls', 
    //   'Vietnamese Food', 
    //   'https://img.taste.com.au/AhhCj8s8/w720-h480-cfill-q80/taste/2018/02/chicken-spring-rolls-134846-1.jpg',
    //   [
    //     new Ingredient('Rice Paper', 5),
    //     new Ingredient('Meat', 2)
    //   ]
    // ),
    // new Recipe('Pho', 
    //   'Vietnamese Famous Food', 
    //   'https://img.taste.com.au/FOmGb0F6/taste/2016/11/chicken-pho-108887-1.jpeg',
    //   [
    //     new Ingredient('Vermicelli', 3),
    //     new Ingredient('Beef', 3)
    //   ]
    // )
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
  
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}