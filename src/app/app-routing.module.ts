import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuardServiceService } from './shared/auth-guard-service.service';
import { TicketComponent } from './ticket/ticket.component';
import { TicketsComponent } from './tickets/tickets.component';

const routes: Routes = [
  {path:"",component: DashboardComponent,canActivate:[AuthGuardServiceService]},
  {path:"signIn",component: LoginComponent}, 
  {path:"tickets",component: TicketsComponent ,canActivate:[AuthGuardServiceService] },
  {path:"settings",component: SettingsComponent,canActivate:[AuthGuardServiceService] },
  {path:"reports",component: ReportsComponent,canActivate:[AuthGuardServiceService] },
  {path:"profile",component: ProfileComponent,canActivate:[AuthGuardServiceService] },
  {path:"create-account",component: RegisterComponent},
  {path:"ticket",component: TicketComponent,canActivate:[AuthGuardServiceService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
