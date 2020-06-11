import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AnalyticsPageComponent} from "./analytics-page/analytics-page.component";
import {CategoriesPageComponent} from "./categories-page/categories-page.component";
import {CategoryDetailsPageComponent} from "./category-details-page/category-details-page.component";
import {HistoryPageComponent} from "./history-page/history-page.component";
import {LoginPageComponent} from './login-page/login-page.component';
import {OrderPageComponent} from "./order-page/order-page.component";
import {OverviewPageComponent} from "./overview-page/overview-page.component";
import {RegisterPageComponent} from './register-page/register-page.component';
import {AuthGuard} from './shared/authGuard';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component';


const routes: Routes = [
  { path: '', component: AuthLayoutComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginPageComponent, },
      { path: 'register', component: RegisterPageComponent, },
  ]},
  { path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      { path: 'analytics', component: AnalyticsPageComponent, },
      { path: 'categories', children:
          [
            { path: '', component: CategoriesPageComponent, },
            { path: 'add', component: CategoryDetailsPageComponent, },
            { path: ':id', component: CategoryDetailsPageComponent, },
          ],
      },
      { path: 'history', component: HistoryPageComponent, },
      { path: 'order', component: OrderPageComponent, },
      { path: 'overview', component: OverviewPageComponent, },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
