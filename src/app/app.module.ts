import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppointmentdetailsComponent } from './components/appointmentdetails/appointmentdetails.component';
import { NextDateComponent } from './components/next-date/next-date.component';
import { AddtimeslotComponent } from './components/addtimeslot/addtimeslot.component';
import { LoginComponent } from './components/login/login.component';
import { MyscheduleComponent } from './components/myschedule/myschedule.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    AppointmentComponent,
    AppointmentdetailsComponent,
    NextDateComponent,
    AddtimeslotComponent,
    LoginComponent,
    MyscheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
