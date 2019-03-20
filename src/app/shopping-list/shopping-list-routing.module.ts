import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list.component';

const shoppingListRoutes: Routes = [
  { path: '', component: ShoppingListComponent },
];
@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(shoppingListRoutes) ],
  exports: [ RouterModule ],
  providers: [],
})
export class ShoppingListRoutingModule {}