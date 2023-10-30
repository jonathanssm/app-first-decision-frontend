import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ModalService} from "../shared/component/modal/modal.service";
import {SpinnerService} from "../shared/component/spinner/spinner.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private modalService: ModalService,
    private spinnerService: SpinnerService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error.message) {
          this.modalService.showMessage(error.error.message);
        } else {
          this.modalService.showMessage(error.message);
        }

        this.spinnerService.hideSpinner();

        return throwError(new Error(error.message));
      })
    );
  }

}
