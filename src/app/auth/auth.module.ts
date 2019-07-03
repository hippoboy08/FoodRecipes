import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

import { SignupComponent } from './signup/signup.component';
import { AuthComponent } from './auth/auth.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SignupComponent,
    AuthComponent,
  ],
  imports: [ 
    CommonModule,
    SharedModule,
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule {}