import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private spinnerVisible = new BehaviorSubject<boolean>(false);

  showSpinner(): void {
    this.spinnerVisible.next(true);
  }

  hideSpinner(): void {
    this.spinnerVisible.next(false);
  }

  getSpinnerVisibility(): Observable<boolean> {
    return this.spinnerVisible.asObservable();
  }

}
