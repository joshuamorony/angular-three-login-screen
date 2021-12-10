import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginStore } from './login.store';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  providers: [LoginStore],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginStore: LoginStore) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  handleLogin() {
    this.loginStore.login(this.loginForm.value);
  }
}
