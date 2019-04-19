import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['', [ Validators.required, Validators.email ]],
      username: ['', Validators.required ],
      password: ['', [ Validators.required, Validators.minLength(6) ]],
      repeatPassword: ['', [ Validators.required, Validators.minLength(6) ]],
    });
  }

  signup() {
    this.authService.register(this.signupForm.value);
  }

  ngOnDestroy(){
    this.authService.cancelSubscriptions();
  }
}
