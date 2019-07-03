import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() message: string = null;
  @Output() close = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  closeModal() {
    this.close.emit();
  }

}
