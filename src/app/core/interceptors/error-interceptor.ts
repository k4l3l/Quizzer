import {
    HttpRequest,
    HttpHandler,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private snackbar: MatSnackBar,
        private router: Router
        ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req)
            .pipe(
                catchError((err:HttpErrorResponse) => {
                    if (err) {
                        this.snackbar.open(err.error.message, 'Close', {
                            duration: 5000
                        });
                        this.router.navigate(['/']);
                    }
                    return throwError(err);
                })
            )
    };
}