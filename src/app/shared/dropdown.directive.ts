import { Directive, HostBinding, HostListener, TemplateRef, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen: boolean = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('click') click() {
    this.isOpen = !this.isOpen;
  }
}
