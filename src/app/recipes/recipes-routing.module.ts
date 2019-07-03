import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RecipesComponent } from "./recipes.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { AuthGuard } from "../auth/auth-guard.service";
import { RecipesResolverService } from './recipes-resolver.service';

const recipesRoutes: Routes = [
  {
    path: '', component: RecipesComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
      {
        path: ':id', component: RecipeDetailComponent,
        resolve: [RecipesResolverService],
      },
      {
        path: ':id/edit', component: RecipeEditComponent,
        resolve: [RecipesResolverService],
        canActivate: [AuthGuard]
      },
    ]
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(recipesRoutes)
  ],
  exports: [RouterModule],
  providers: [
    /* This service is in module level because this module is lazily loaded
      which means this service is a different instance to the one provided in root level.
      ** !!!Only provide the service in module level if it is only used in this module!!! */
    AuthGuard
  ]
})
export class RecipesRoutingModule {

}