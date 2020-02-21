import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AppointmentdetailsComponent } from './components/appointmentdetails/appointmentdetails.component';
import { NextDateComponent } from './components/next-date/next-date.component';


const routes: Routes = [
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
  { path: 'calendar', component: CalendarComponent },
  { path: 'calendar/:id', component: AppointmentComponent },
  { path: 'appointment/:id', component: AppointmentdetailsComponent },
  {path: 'nextdate', component: NextDateComponent},
  // { path: 'nextdate/:date', component: NextDateComponent },
  {path: 'nextdate/:id', component: AppointmentComponent},
  // { path: 'nextdate/:date/:id', component: AppointmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
