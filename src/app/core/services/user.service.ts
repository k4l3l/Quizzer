import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from 'src/app/components/shared/models/user.model';

const QUIZ_URL = 'http://localhost:5000/quiz/';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    _eventSubscriptions: Subscription[] = [];
    private user: User;
    public userInfo = new BehaviorSubject<User>(this.user);

    constructor(
        private http: HttpClient,
    ) { }

    fetchUser() {
        this._eventSubscriptions.push(this.http.get(QUIZ_URL + 'result').subscribe((user: User) => {
            this.user = user;
            this.userInfo.next({...this.user});
        }));
    }
}