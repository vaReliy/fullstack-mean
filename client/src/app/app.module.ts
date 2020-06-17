import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {AnalyticsPageComponent} from './analytics-page/analytics-page.component';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CategoriesPageComponent} from './categories-page/categories-page.component';
import {CategoryDetailsPageComponent} from './category-details-page/category-details-page.component';
import {CategoryFormComponent} from './category-details-page/category-form/category-form.component';
import {PositionsFormComponent} from './category-details-page/positions-form/positions-form.component';
import {HistoryPageComponent} from './history-page/history-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {OrderCategoriesComponent} from './order-page/order-categories/order-categories.component';
import {OrderPageComponent} from './order-page/order-page.component';
import {OrderPositionsComponent} from './order-page/order-positions/order-positions.component';
import {OverviewPageComponent} from './overview-page/overview-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {LoaderComponent} from './shared/layouts/loader/loader.component';
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component';
import {TokenInterceptor} from './shared/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    OverviewPageComponent,
    AnalyticsPageComponent,
    CategoriesPageComponent,
    HistoryPageComponent,
    OrderPageComponent,
    CategoryDetailsPageComponent,
    LoaderComponent,
    CategoryFormComponent,
    PositionsFormComponent,
    OrderCategoriesComponent,
    OrderPositionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
