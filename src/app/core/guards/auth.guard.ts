import { Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanLoad {

    constructor(
        private authService: AuthService,
        private router: Router,
        private snackbar: MatSnackBar
    ) { }

    canLoad(route: Route, segments: UrlSegment[]) {
        if (this.authService.isAuthChanged.getValue()) {
            return true;
        }
        this.snackbar.open('Please login first!', 'Close', {
            duration: 5000
        });
        this.router.navigate(['/login']);
        return false;
    }

}