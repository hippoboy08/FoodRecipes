import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as fromApp from "../../store/app.reducers";
import * as recipesActions from '../store/recipes.action';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeIndex: number;
  recipe: Recipe;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>) {

  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeIndex = +params['id'];
        // this.recipe = this.recipeService.getRecipe(this.recipeIndex);
        this.store.select('recipes').subscribe(recipesState => this.recipe = recipesState.recipes[this.recipeIndex])
        // if the route contains id, then edit mode is true, false if null
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  /* Initialize the reactive for editing recipe */
  initForm() {
    let selectedRecipe: Recipe = new Recipe('', '', '', []);
    let ingredientList: FormArray = new FormArray([]);
    if (this.editMode) {
      // selectedRecipe = this.recipeService.getRecipe(this.recipeIndex);
      this.store.select('recipes').pipe(
        map(recipesState => {
          return recipesState.recipes.find((recipe, index) => index === this.recipeIndex);
        })
      ).subscribe(recipe => {
        selectedRecipe = recipe;
        if (selectedRecipe['ingredients']) {
          for (let ingredient of selectedRecipe.ingredients) {
            ingredientList.push(
              new FormGroup({
                'name': new FormControl(ingredient.name, [Validators.required]),
                'amount': new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            );
          }
        }
      })
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(selectedRecipe.name, [Validators.required]),
      'description': new FormControl(selectedRecipe.description, [Validators.required]),
      'imagePath': new FormControl(selectedRecipe.imagePath, [Validators.required]),
      'ingredients': ingredientList
    });
  }

  /* gets controls of the given formarray name to pass to HTML */
  getControlsOf(formArrayName: string) {
    return (<FormArray>this.recipeForm.get(formArrayName)).controls;
  }

  /* adds a form control to the form as new ingredient input */
  addIngredient() {
    let ingredients = <FormArray>this.recipeForm.get('ingredients');
    ingredients.push(
      new FormGroup({
        'name': new FormControl(null, [Validators.required]),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  /* update the selected recipe on submit */
  updateRecipe() {
    console.log(this.recipeForm);
    const recipe: Recipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredients
    );
    // if editMode is true -> update, else add new recipe
    if (this.editMode == false) {
      // this.recipeService.addRecipe(recipe);
      this.store.dispatch(new recipesActions.AddRecipe(recipe));
    } else {
      // this.recipeService.updateRecipe(this.recipeIndex, recipe);
      this.store.dispatch(new recipesActions.UpdateRecipe({ index: this.recipeIndex, recipe: recipe }));
    }
    this.goBack();
  }

  /* deletes the ingredient */
  deleteIngredient(index: number) {
    (<FormArray>this.recipeForm.controls.ingredients).removeAt(index);
  }

  // go back 1 level (previous route)
  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
