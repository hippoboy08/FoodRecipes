import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import * as fromApp from '../../store/app.reducers';
import * as recipesActions from '../../recipes/store/recipes.action';
import { map, tap } from 'rxjs/operators';
import { Recipe } from 'src/app/recipes/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // authState: Observable<fromAuth.State>;
  isAuthenticated: boolean = false;

  constructor(private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select('auth')
      .pipe(
        map(authState => authState.user)
      ).subscribe((user) => {
        this.isAuthenticated = !!user;
      })
  }

  saveData() {
    // this.dataStorageService.storeRecipes()
    // .subscribe(
    //   (response) => console.log('Successfully saved:', response),
    //   (error: Error) => console.log(error)
    // );
    this.store.dispatch(new recipesActions.StoreRecipes())
  }

  // isAuthenticated() {
  //   return this.authService.isAuthenticated();
  // }

  getData() {
    // this.dataStorageService.getRecipes().subscribe();
    this.store.dispatch(new recipesActions.FetchRecipes())
  }

  logout() {
    this.authService.signoutUser();
  }
}
