import {Component, Input} from '@angular/core';
import {SpinnerService} from "./spinner.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {

  @Input() diameter: number = 150;
  @Input() mode: 'determinate' | 'indeterminate' = 'indeterminate';
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';

  public spinnerVisible = this.spinnerService.getSpinnerVisibility();

  constructor(private spinnerService: SpinnerService) {
  }

}
