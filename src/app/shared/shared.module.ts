import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    DropdownDirective
  ],
  exports: [
    /* Common module includes all the basic directives and components of angular (*ngIf, ...) */
    CommonModule,
    DropdownDirective
  ]
})
export class SharedModule {}