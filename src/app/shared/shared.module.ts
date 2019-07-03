import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './placeholder.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    DropdownDirective,
    AlertComponent,
    PlaceholderDirective,
    LoadingSpinnerComponent
  ],
  /* Components that will be added in run-time eventually */
  entryComponents: [
    AlertComponent
  ],
  exports: [
    /* Common module includes all the basic directives and components of angular (*ngIf, ...) */
    CommonModule,
    DropdownDirective,
    AlertComponent,
    PlaceholderDirective,
    LoadingSpinnerComponent
  ]
})
export class SharedModule {}