import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _token: string;

  constructor(
    private http: HttpClient,
  ) {
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/api/auth/register`, user);
  }

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${environment.apiUrl}/api/auth/login`, user).pipe(
      tap(({ token}) => {
        this.setToken(token);
      }),
    );
  }

  logout() {
    this.setToken(null);
  }

  setToken(value: string) {
    this._token = value;
    localStorage.setItem('auth-token', value);
  }

  getToken(): string {
    return this._token;
  }

  isAuthenticated(): boolean {
    return !!this._token;
  }
}
