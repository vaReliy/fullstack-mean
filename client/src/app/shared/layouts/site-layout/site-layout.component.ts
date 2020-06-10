import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

import {AuthService} from "../../services/auth.service";
import {MaterializeService} from "../../services/materialize.service";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss'],
})
export class SiteLayoutComponent implements AfterViewInit {
  @ViewChild('floatingButton', { static: true }) floatingRef: ElementRef;
  links = [
    { route: '/overview', name: 'Огляд' },
    { route: '/analytics', name: 'Аналітика' },
    { route: '/history', name: 'Історія' },
    { route: '/order', name: 'Додати замовлення' },
    { route: '/categories', name: 'Асортимент' },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngAfterViewInit(): void {
    MaterializeService.initFloatingActionButton(this.floatingRef.nativeElement);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login'], {
      queryParams: {
        registered: true,
      },
    });
  }
}
