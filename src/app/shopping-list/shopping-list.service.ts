import { Injectable } from "@angular/core";

import { Subject } from "rxjs";
import { Store } from "@ngrx/store";
import * as shoppingListActions from '../shopping-list/store/shopping-list.actions';

import { Ingredient } from "../shared/ingredient.model";
// import { State } from "./store/shopping-list.reducers";
import * as fromApp from "../store/app.reducers";

@Injectable()
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  ingredientsEditing = new Subject<number>();

  constructor(private store: Store<fromApp.AppState>) { }

  getIngredient(index: number) {
    // return this.ingredients[index];
  }

  startEditIngredient(index: number) {
    // let editedIngredient: Ingredient;
    // this.store.select('shoppingList').subscribe((state: State) => {
    //   editedIngredient = state.ingredients[index];
    // });
    return this.store.dispatch(new shoppingListActions.StartEditIngredient(index));
  }

  stopEdit() {
    this.store.dispatch(new shoppingListActions.StopEditIngredient());
  }

  getIngredients() {
    // return this.ingredients.slice();
    return this.store.select('shoppingList');
  }

  addIngredient(ingredient: Ingredient) {
    /* Use NgRx now, so this below line is unnecessary */
    // this.ingredients.push(ingredient);
    // this.ingredientsChanged.next(this.ingredients.slice());
    this.store.dispatch(new shoppingListActions.AddIngredient(ingredient));
    // this.store.select('shoppingList');
  }

  updateIngredient(ingredientIndex: number, newIngredient: Ingredient) {
    /* Use NgRx now, so this below line is unnecessary */
    // this.ingredients[ingredientIndex] = newIngredient;
    // this.ingredientsChanged.next(this.ingredients.slice());
    this.store.dispatch(new shoppingListActions.UpdateIngredient(newIngredient));
  }

  deleteIngredient(ingredientIndex: number) {
    // this.ingredients.splice(ingredientIndex, 1);
    // this.ingredientsChanged.next(this.ingredients.slice());
    this.store.dispatch(new shoppingListActions.DeleteIngredient());
  }

  addIngredients(ingredients: Ingredient[]) {
    // this.ingredients.push(...ingredients);
    // this.ingredientsChanged.next(this.ingredients.slice());
    /* Uses NgRx as global state now */
    this.store.dispatch(new shoppingListActions.AddIngredients(ingredients));
  }
}