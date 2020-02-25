import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  appointmentForm;
  timeslots: any = [];
  id: any;
  appointments: any = [];
  appointmentDetails: any = [];
  timeslotsNextDay: any = [];
  pipe = new DatePipe('en-US');
  currentLocation: any;
  personalAppointments: any = [];
  
  currentDate: any;
  tommorrowsDate: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.appointmentForm = this.formBuilder.group({
      licensePlate: '',
      company: ''
    })
  }

  ngOnInit() {
    this.currentLocation = sessionStorage.getItem("location");
    if(this.currentLocation == null) {
      this.currentLocation = "location1";
    }
    this.timeslots = JSON.parse(sessionStorage.getItem(this.currentLocation + "timeslots"));
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.router.url == '/nextdate/' + this.id) {
      this.timeslots = JSON.parse(sessionStorage.getItem(this.currentLocation + "timeslotsNextDay"));
    }
    this.timeslotsNextDay = JSON.parse(sessionStorage.getItem(this.currentLocation + "timeslotsNextDay"));

    this.currentDate = new Date();
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    this.tommorrowsDate = new Date();
    this.tommorrowsDate.setDate(this.currentDate.getDate() + 1);
  }

  onSubmit(appointmentData) {
    console.log(this.timeslots);
    var transportReference = uuidv4();
    var username = sessionStorage.getItem("username");
    this.currentLocation = sessionStorage.getItem("location");
    if(this.currentLocation == null) {
      this.currentLocation = "location1";
    }
    this.id = this.route.snapshot.paramMap.get("id");
    this.personalAppointments = JSON.parse(sessionStorage.getItem(username));
    this.appointmentDetails = [];
    var temp = {"licensePlate": appointmentData.licensePlate, "company": appointmentData.company, "transportReference": transportReference};
    this.appointments = JSON.parse(sessionStorage.getItem(this.currentLocation + this.id));
    if(this.appointments == null) {
      this.appointments = [];
    }
    if(this.personalAppointments == null) {
      this.personalAppointments = [];
    }
    for (let timeslot of this.timeslots) {
      
      if (timeslot.id == this.id) {
        timeslot.slots--;
        this.timeslots[this.id] = timeslot;
        if (this.router.url == '/nextdate/' + this.id) {
          
          sessionStorage.setItem(this.currentLocation + "timeslotsNextDay", JSON.stringify(this.timeslots));
          this.appointments.push(temp);
          this.personalAppointments.push({timeslot: timeslot.timePeriod, appointment: temp, location: this.currentLocation, date: this.tommorrowsDate});
          sessionStorage.setItem(this.currentLocation + this.id, JSON.stringify(this.appointments));
          sessionStorage.setItem(username, JSON.stringify(this.personalAppointments));
          this.router.navigateByUrl('/nextdate');
        } else {
          this.appointments.push(temp);
          this.personalAppointments.push({timeslot: timeslot.timePeriod, appointment: temp, location: this.currentLocation, date: this.currentDate});
          sessionStorage.setItem(this.currentLocation + this.id, JSON.stringify(this.appointments));
          sessionStorage.setItem(this.currentLocation + "timeslots", JSON.stringify(this.timeslots));
          sessionStorage.setItem(username, JSON.stringify(this.personalAppointments));
          this.router.navigateByUrl('/calendar');
        }
      }
    }
    this.appointmentForm.reset();
    
  }

  toCalendar() {
    this.router.navigateByUrl('/calendar');
  }

}
