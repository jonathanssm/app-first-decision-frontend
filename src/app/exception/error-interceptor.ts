import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ModalService} from "../shared/component/modal/modal.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private modalService: ModalService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.modalService.showMessage(error.error.message)

        return throwError(new Error(error.error));
      })
    );
  }

}
