import { NgModule } from "@angular/core";
import { AppRoutingModule } from "../app-routing.module";
import { SharedModule } from "../shared/shared.module";

import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";

import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "../recipes/recipe.service";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { AuthService } from "../auth/auth.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "../shared/auth.interceptor";
import { LoggingInterceptor } from "../shared/logging.interceptor";

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    /* These are in the root level because this module is not lazyli loaded, but loaded when the app is launched */
    DataStorageService, RecipeService, ShoppingListService, AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
  ]
})
export class CoreModule {}