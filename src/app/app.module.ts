import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AppointmentComponent, TransportReferenceDialogComponent } from './components/appointment/appointment.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppointmentdetailsComponent } from './components/appointmentdetails/appointmentdetails.component';
import { NextDateComponent } from './components/next-date/next-date.component';
import { AddtimeslotComponent, BelowZeroDialogComponent } from './components/addtimeslot/addtimeslot.component';
import { LoginComponent } from './components/login/login.component';
import { MyscheduleComponent } from './components/myschedule/myschedule.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    AppointmentComponent,
    AppointmentdetailsComponent,
    NextDateComponent,
    AddtimeslotComponent,
    LoginComponent,
    MyscheduleComponent,
    BelowZeroDialogComponent,
    TransportReferenceDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule , 
  ],
  entryComponents: [BelowZeroDialogComponent, TransportReferenceDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
