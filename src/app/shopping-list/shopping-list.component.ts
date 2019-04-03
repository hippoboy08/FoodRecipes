import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppStates } from './store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredients: Ingredient[];
  shoppingListState: Observable<{ingredients: Ingredient[]}>;
  subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService, 
    private store: Store<AppStates>
    ) { }

  ngOnInit() {
    /* Use NgRx state to get data instead of local shoppingListService */
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
    this.shoppingListState = this.store.select('shoppingList');
  }

  editIngredient(ingredientIndex: number) {
    this.shoppingListService.startEditIngredient(ingredientIndex);
  }

  ngOnDestroy(): void {
    /* Called once, before the instance is destroyed.*/
    /* Add 'implements OnDestroy' to the class. */
    // this.subscription.unsubscribe();
  }

}
