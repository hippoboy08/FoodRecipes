import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;
  
  constructor(private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppStates>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  saveData() {
    this.dataStorageService.storeRecipes()
    .subscribe(
      (response) => console.log('Successfully saved:', response),
      (error: Error) => console.log(error)
    );
  }

  // isAuthenticated() {
  //   return this.authService.isAuthenticated();
  // }

  getData() {
    this.dataStorageService.getRecipes();
  }

  logout() {
    this.authService.signoutUser();
  }
}
