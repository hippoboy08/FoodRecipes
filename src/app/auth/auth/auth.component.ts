import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Subscription, Observable } from 'rxjs';
import { PlaceholderDirective } from 'src/app/shared/placeholder.directive';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { Store } from '@ngrx/store';
import * as fromApp from "../../store/app.reducers";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  signUpMode: boolean = false;
  isLoading: boolean;
  // error: string = null;
  errorSubscription: Subscription;
  closeSubscription: Subscription;
  @ViewChild(PlaceholderDirective, { static: false }) alertModalHost: PlaceholderDirective;

  constructor(private authService: AuthService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // this.errorSubscription = this.authService.error.subscribe(error => this.showAlertModal(error.message));
    this.errorSubscription = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.isLoading;
      if(authState.errorMessage) {
        this.showAlertModal(authState.errorMessage)
      }
    })
  }

  // closeAlert() {
  //   this.error = null;
  // }

  /* This will imperatively load Alert component to the DOM instead of using template-driven method with *ngIf */
  private showAlertModal(message: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const alertViewContainerRef = this.alertModalHost.viewContainerRef;
    const alertComponent = alertViewContainerRef.createComponent(alertComponentFactory);
    alertComponent.instance.message = message;
    this.closeSubscription = alertComponent.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe();
      alertViewContainerRef.clear();
    });
  }

  toggleMode() {
    this.signUpMode = !this.signUpMode;
  }

  authenticate(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    if(this.signUpMode) {
      this.authService.signupUser(email, password);
    }else {
      this.authService.signinUser(email, password);
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }
}
