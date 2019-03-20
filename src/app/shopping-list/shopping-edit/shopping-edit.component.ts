import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInputRef:ElementRef;
  // @ViewChild('amountInput') amountInputRef:ElementRef;
  /* Template Driven approach */
  @ViewChild('tdForm') tdForm:NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editedIngredientIndex: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.ingredientsEditing.subscribe(
      (ingredientIndex: number) => {
        // console.log(ingredientIndex);
        this.editedIngredientIndex = ingredientIndex;
        this.editMode = true;
        let editedIngredient: Ingredient = this.shoppingListService.getIngredient(ingredientIndex);
        this.tdForm.setValue({
          ingreName: editedIngredient.name,
          ingreAmount: editedIngredient.amount
        });
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // addIngredient() {
  //   let name = this.nameInputRef.nativeElement.value;
  //   let amount = +this.amountInputRef.nativeElement.value;
  //   if(name && amount) {
  //     // this.addedIngredient.emit(new Ingredient(name, amount));
  //     this.shoppingListService.addIngredient(new Ingredient(name, amount));
  //   }  
  // }
  updateIngredientList(form: NgForm) {
    // console.log(form);
    const ingredient: Ingredient = new Ingredient(form.value.ingreName, form.value.ingreAmount);
    if(this.editMode === false) {
      // add new ingredient
      if(ingredient.name && ingredient.amount) {
        // this.addedIngredient.emit(new Ingredient(name, amount));
        this.shoppingListService.addIngredient(ingredient);
      }
    }
    else {
      // update existing ingredient
      if(ingredient.name && ingredient.amount) {
        // this.addedIngredient.emit(new Ingredient(name, amount));
        this.shoppingListService.updateIngredient(this.editedIngredientIndex, ingredient);
      }
    }
    // clear the form & back to the normal mode
    this.editMode = false;
    form.reset();
    // console.log(this.shoppingListService.getIngredients());
  }

  /* deletes the selected ingredient */
  deleteIngredient(ingredientIndex: number = this.editedIngredientIndex) {
    this.shoppingListService.deleteIngredient(ingredientIndex);
    this.clear();
    // console.log(this.shoppingListService.getIngredients());
  }

  clear() {
    this.editMode = false;
    this.tdForm.reset();
  }
}
