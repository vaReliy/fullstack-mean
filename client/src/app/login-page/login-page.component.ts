import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {User} from '../shared/models/user.model';
import {AuthService} from '../shared/services/auth.service';
import {MaterializeService} from '../shared/services/materialize.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });
  private aSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterializeService.showMessage('Для доступу, авторизуйтесь!');
      } else if (params['accessDenied']) {
        MaterializeService.showErrorMessage('Для доступу, авторизуйтесь!');
      } else if (params['sessionExpired']) {
        MaterializeService.showErrorMessage('Увійдіть до системи ще раз!');
      }
    });
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  onSubmit() {
    this.form.disable();
    const user: User = this.form.getRawValue();
    this.aSub = this.authService.login(user).subscribe(
      () => this.router.navigate(['/overview']),
      error => {
        MaterializeService.showErrorMessage('Помилка входу в систему');
        this.form.enable();
      },
    )
  }
}
