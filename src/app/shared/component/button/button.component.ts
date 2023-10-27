import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input()
  public name: string = '';

  @Input()
  public block: boolean = false;

  @Input()
  public icon?: string = '';

  @Output()
  public eventClick: EventEmitter<any> = new EventEmitter();

  public showIcon: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.showIcon = this.icon !== undefined && this.icon.length > 0;
  }

  emitEventClick(event: Event): void {
    this.eventClick.emit(event);
  }

}
