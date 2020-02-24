import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AppointmentdetailsComponent } from './components/appointmentdetails/appointmentdetails.component';
import { NextDateComponent } from './components/next-date/next-date.component';
import { AddtimeslotComponent } from './components/addtimeslot/addtimeslot.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'calendar/:id', component: AppointmentComponent },
  { path: 'appointment/:id', component: AppointmentdetailsComponent },
  {path: 'nextdate', component: NextDateComponent},
  // { path: 'nextdate/:date', component: NextDateComponent },
  {path: 'nextdate/:id', component: AppointmentComponent},
  {path: 'addtimeslot/:id', component: AddtimeslotComponent},
  {path: 'addtimeslot/:nextdate/:id', component: AddtimeslotComponent},
  // { path: 'nextdate/:date/:id', component: AppointmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
