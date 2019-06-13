import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// import { RecipesModule } from './recipes/recipes.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { appReducers } from './store/app.reducers';

import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { AuthEffects } from './auth/store/auth.effects';
import { AppEffects } from './app.effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    /* BrowserModule, which contains all features of CommonModule and some additional features that 
      we need when the app is being run! */
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    /* These modules are now lazy loaded in app-routing module */
    // RecipesModule,
    // ShoppingListModule,
    SharedModule,
    StoreModule.forRoot(appReducers),
    // EffectsModule.forRoot([AuthEffects, AppEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
