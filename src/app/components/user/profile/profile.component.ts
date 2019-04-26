import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // userSub: Subscription
  // user: User;
  // constructor(
  //   private userService: UserService
  // ) { }

  ngOnInit() {
  //   this.userService.fetchUser();
  //   this.userSub = this.userService.userInfo.subscribe((user) => {
  //     this.user = user;
  //   })
  }

}
