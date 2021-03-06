import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

// import { RecipesModule } from './recipes/recipes.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { appReducers } from './store/app.reducers';

import { AppComponent } from './app.component';

import { environment } from 'src/environments/environment';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { AuthEffects } from './auth/store/auth.effects';
import { RecipesEffects } from './recipes/store/recipes.effect';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    /* BrowserModule, which contains all features of CommonModule and some additional features that 
      we need when the app is being run! */
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CoreModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    /* These modules are now lazy loaded in app-routing module */
    // RecipesModule,
    // ShoppingListModule,
    SharedModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([AuthEffects, RecipesEffects]),
    StoreDevtoolsModule.instrument({logOnly: environment.production})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
