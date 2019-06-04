
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
    private store: Store<fromApp.AppStates>,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // return this.authService.isAuthenticated();
    // if(this.authService.isAuthenticated()) {
    if(this.store.select('auth').pipe(map((authState: fromAuth.State) => authState.authenticated))) {
      return true;
    }else {
      this.router.navigate(['/signin']);
    }
  }

  

  canLoad(
    route: Route
  ): Observable<boolean> | Promise<boolean> | boolean {
    // if(this.authService.isAuthenticated()) {
    if(this.store.select('auth').pipe(map((authState: fromAuth.State) => authState.authenticated))) {
      return true;
    }else {
      this.router.navigate(['/signin']);
    }
  }
  
}
