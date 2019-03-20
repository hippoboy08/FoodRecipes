import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";

import { HomeComponent } from "./core/home/home.component";
// import { AuthGuard } from "./auth/auth-guard.service";

const routes: Routes = [
  { path: '', component: HomeComponent },
  /* Lazy loading */
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule', 
    // canLoad: [AuthGuard]
  },
  { path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

