import { JwtModule  } from '@auth0/angular-jwt';
import { AdminComponent } from './admin/admin.component';
import { PhotoService } from './services/photo.service';
import * as Raven from 'raven-js';
import { VehicleService } from './services/vehicle.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastyModule} from 'ng2-toasty';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { AppErrorHandler } from './app.error-handler';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { ViewFormComponent } from './view-form/view-form.component';
import { AuthService } from './services/auth.service';
import { CallbackComponent } from './callback/callback.component';

Raven.config('https://ca1c153518344cef847a78715779246f@sentry.io/1244394').install();

export function tokenGetter() {
  return localStorage.getItem('access_token');
}


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    VehicleFormComponent,
    VehicleListComponent,
    PaginationComponent,
    ViewVehicleComponent,
    ViewFormComponent,
    CallbackComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost']
      }
    }),
    FormsModule,
    ToastyModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
      { path: 'home', component: CounterComponent },
      { path: 'vehicles/new', component: VehicleFormComponent },
      { path: 'vehicles/edit/:id', component: VehicleFormComponent },
      { path: 'vehicles/:id', component: ViewVehicleComponent },
      { path: 'vehicles', component: VehicleListComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'callback', component: CallbackComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: '**', redirectTo: 'home'}
    ])
  ],
  providers: [
    { provide: ErrorHandler, useClass:AppErrorHandler }, 
    AuthService,
    VehicleService,
    PhotoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
