import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

const AUTH_URL = 'http://localhost:5000/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _eventSubscriptions: Subscription[] = [];

  nameProvider = new BehaviorSubject<string>(null);
  isAuthChanged = new BehaviorSubject<boolean>(false);
  isAdminStatus = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
  }

  login(userData) {
    this._eventSubscriptions.push(this.http.post(AUTH_URL + 'login', userData).subscribe((data) => {
      if(!data['success']){
        let msg = Object.values(data['errors']);
        this.snackBar.open(msg.join(' '), 'Close', {
          duration: 5000,
        });
      } else {
        this.snackBar.open('Successfully logged in!', 'Close', {
          duration: 5000,
        });
        this.saveUserInfo(data);
        this.initAuth();
        this.router.navigate(['/']);
      }
    }));
  }

  register(userData) {
    this._eventSubscriptions.push(this.http.post(AUTH_URL + 'signup', userData).subscribe((data) => {
      if(!data['success']){
        let msg = Object.values(data['errors']);
        this.snackBar.open(msg.join(' '), 'Close', {
          duration: 5000,
        });
      } else {
        this.snackBar.open('Successfully registered! Please login.', 'Close', {
          duration: 5000,
        });
        this.router.navigate(['/login']);
      }
    }));
  }

  logout(){
    localStorage.clear();
    this.initAuth();
    this.router.navigate(['/']);
    this.snackBar.open('Successfully logget out!', 'Close', {
      duration: 5000,
    });
  }

  saveUserInfo(data) {
    let isAdmin = data['user']['roles'].includes('Admin') ? 'true' : 'false';
    localStorage.setItem('token', data['token']);
    localStorage.setItem('username', data['user']['username']);
    localStorage.setItem('isAdmin', isAdmin);
  }

  initAuth() {
    this.getName();
    this.getAdmin();
    this.getAuth();
  }

  private getName() {
    return this.nameProvider.next(localStorage.getItem('username') ? localStorage.getItem('username') : null);
  }

  private getAdmin() {
    return this.isAdminStatus.next(localStorage.getItem('isAdmin') === 'true' ? true : false);
  }

  private getAuth() {
    return this.isAuthChanged.next(localStorage.getItem('token') ? true : false);
  }

  cancelSubscriptions() {
    this._eventSubscriptions.forEach((s) => s.unsubscribe());
  }

}
