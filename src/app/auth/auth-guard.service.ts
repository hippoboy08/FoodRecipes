
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';
import { map, take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
    private store: Store<fromApp.AppState>,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return this.authService.isAuthenticated();
    // if(this.authService.isAuthenticated()) {
    return this.store.select('auth')
      .pipe(
        take(1),
        map((authState: fromAuth.State) => authState.user),
        map((user) => {
          if (user) {
            return true;
          } else {
            return this.router.createUrlTree(['/auth']);
          }
        }));
  }



  canLoad(
    route: Route
  ): Observable<boolean> | Promise<boolean> | boolean {
    // if(this.authService.isAuthenticated()) {
    return this.store.select('auth')
      .pipe(map((authState: fromAuth.State) => {
        if (authState.authenticated) {
          return true;
        } else {
          this.router.navigate(['/auth']);
        }
      }));
  }

}
