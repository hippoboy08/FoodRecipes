import { Component, OnInit } from '@angular/core';

import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // when specifying the RecipeService here, it would be destroyed if this component is unload (navigate to shoppinglist component)
  // solution: provides it in the app component or set providedIn: root in the service.ts itself
  // providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }



}
