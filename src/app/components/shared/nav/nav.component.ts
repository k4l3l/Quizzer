import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  isLoggedSub: Subscription;
  isAdminSub: Subscription;

  isLogged = false;
  isAdmin = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.initAuth();
    this.isLoggedSub = this.authService.isAuthChanged.subscribe((bool) => {
      this.isLogged = bool;
    });
    this.isAdminSub = this.authService.isAdminStatus.subscribe((bool) => {
      this.isAdmin = bool;
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(){
    this.isLoggedSub.unsubscribe();
    this.isAdminSub.unsubscribe();
  }

}
