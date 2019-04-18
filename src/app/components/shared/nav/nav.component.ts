import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLogged = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.isAuthChanged.subscribe((bool) => {
      this.isLogged = bool;
    })
  }

  logout(){
    this.authService.logout();
  }

}
