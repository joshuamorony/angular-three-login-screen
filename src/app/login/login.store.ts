import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LoginCredentials, LoginStatus } from './login.model';

export interface LoginState {
  status: LoginStatus;
}

@Injectable()
export class LoginStore extends ComponentStore<LoginState> {
  status$ = this.select((state) => state.status);

  login = this.effect((credentials$: Observable<LoginCredentials>) => credentials$.pipe(
      tap(() => this.setState({ status: 'authenticating' })),
      switchMap((credentials) =>
        this.authService.login(credentials).pipe(
          tap({
            next: (success) => this.setState({ status: 'success' }),
            error: (err) => this.setState({ status: 'error' }),
          }),
          catchError(() => EMPTY)
        )
      )
    ));

  constructor(private authService: AuthService) {
    super({ status: 'pending' });
  }
}
