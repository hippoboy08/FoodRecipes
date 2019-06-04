import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { map } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {
  private databaseURL: string = 'https://recipe-book-c0342.firebaseio.com';
  constructor(private http: HttpClient, 
    private recipeService: RecipeService,
    private authService: AuthService) {}

  storeRecipes() {
    // // const token = this.authService.getToken();
    // // const headers = new HttpHeaders().set('Authorization', 'test asdflsdk');
    // // return this.http.put(this.databaseURL+'/recipes.json'+'?auth='+token, this.recipeService.getRecipes());
    // // return this.http.put(this.databaseURL+'/recipes.json'+'?auth='+token, this.recipeService.getRecipes(), {
    // return this.http.put(this.databaseURL+'/recipes.json', this.recipeService.getRecipes(), {
    //   observe: 'body',
    //   // headers: headers,
    //   params: new HttpParams().set('auth', token)
    // });
    /* using reportProgress to get value for showing loading progress if the amount of data is big */
    const request = new HttpRequest(
      'PUT', this.databaseURL+'/recipes.json', 
      this.recipeService.getRecipes(), 
      { reportProgress: true}
    );
    return this.http.request(request);
  }

  getRecipes() {
    // const token = this.authService.getToken();
    // return this.http.get(this.databaseURL+'/recipes.json'+'?auth='+token)
    return this.http.get(this.databaseURL+'/recipes.json', {
      observe: 'body',
      responseType: 'json' //default, don't need to define
    })
    .pipe(map(
      (response: HttpResponse<Recipe[]>) => {
        const recipes = <Recipe[]><any>response;        
        for(let recipe of recipes) {
          if(!recipe.ingredients) {
            recipe.ingredients = [];
          }
        }
        return recipes;
      }
    ))
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }
    );
  }
}