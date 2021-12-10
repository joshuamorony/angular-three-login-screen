import { Injectable } from '@angular/core';
import { switchMap, throwError, timer } from 'rxjs';
import { LoginCredentials } from '../login/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // Simulate login attempt - username "fail" forces a failure
  login(credentials: LoginCredentials) {
    return timer(2000).pipe(
      switchMap(() =>
        credentials.username !== 'fail'
          ? 'success'
          : throwError(() => new Error('login failed'))
      )
    );
  }
}
