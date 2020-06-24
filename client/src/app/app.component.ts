import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';

import {environment} from '../environments/environment';
import {AuthService} from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {
  }

  ngOnInit(): void {
    const availableToken = localStorage.getItem('auth-token');
    if (availableToken) {
      this.authService.setToken(availableToken);
    }

    if (environment.production) {
      this.http.get('assets/heroku.port').subscribe(port => {
        environment.apiUrl += `:${port}`;
      });
    }
  }
}
