import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItunesSearchComponent } from './itunes-search/itunes-search.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './service/route-guard.service';
import { WeatherSearchComponent } from './weather-search/weather-search.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'itunes', component: ItunesSearchComponent, canActivate:[RouteGuardService]},
  {path: 'weather', component: WeatherSearchComponent, canActivate:[RouteGuardService]},
  {path: 'logout', component: LogoutComponent, canActivate:[RouteGuardService]}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
