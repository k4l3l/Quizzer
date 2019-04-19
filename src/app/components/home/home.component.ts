import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name = '';
  isLogged = false;
  constructor(
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.authService.nameProvider.subscribe((name) => {
      this.name = name;
    });
    this.authService.isAuthChanged.subscribe((bool) => {
      this.isLogged = bool;
    })
  }

}
