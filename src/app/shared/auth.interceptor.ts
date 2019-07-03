import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { switchMap, take, map, exhaustMap, catchError } from "rxjs/operators";

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import { AuthService } from "../auth/auth.service";
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>,
    // private authService: AuthService,
    private router: Router
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('Intercepted!', req);
    /* reconfig the cloned request instead of the original one before sending*/
    // const copiedReq = req.clone({params: req.params.set('auth', this.authService.getToken())});
    // return next.handle(copiedReq);
    return this.store.select('auth')
      /* store.select is a subscription, whenever the state changes, it will fire and send request.
        Even when logout which will cause Http error with null token -> take(1)*/
      .pipe(
        take(1),
        map((authState: fromAuth.State) => authState.user),
        exhaustMap((user) => {
          // console.log('auth interceptor:', user);
          if(!user){
            return next.handle(req);
          }else {
            const copiedReq = req.clone({ params: req.params.set('auth', user.token) });
            return next.handle(copiedReq);
          }}));
    // return null;
  }
}