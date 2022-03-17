import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { TicketsComponent } from './tickets/tickets.component';

const routes: Routes = [
  {path:"",component: DashboardComponent},
  {path:"signIn",component: LoginComponent}, 
  {path:"tickets",component: TicketsComponent },
  {path:"settings",component: SettingsComponent },
  {path:"reports",component: ReportsComponent },
  {path:"profile",component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
