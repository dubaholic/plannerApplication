import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

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
    this.timeslots = JSON.parse(sessionStorage.getItem("timeslots"));
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.router.url == '/nextdate/' + this.id) {
      this.timeslots = JSON.parse(sessionStorage.getItem("timeslotsNextDay"));
    }
    this.timeslotsNextDay = JSON.parse(sessionStorage.getItem("timeslotsNextDay"));

  }

  onSubmit(appointmentData) {
    this.id = this.route.snapshot.paramMap.get("id");
    this.appointmentDetails = [];
    this.appointments = JSON.parse(sessionStorage.getItem(this.id));
    if(this.appointments == null) {
      this.appointments = [];
    }
    for (let timeslot of this.timeslots) {
      if (timeslot.id == this.id) {
        timeslot.slots--;
        this.timeslots[this.id] = timeslot;
        if (this.router.url == '/nextdate/' + this.id) {
          sessionStorage.setItem("timeslotsNextDay", JSON.stringify(this.timeslots));
          this.appointments.push(appointmentData);
          console.log(this.appointments);
          sessionStorage.setItem(this.id, JSON.stringify(this.appointments));
          this.router.navigateByUrl('/nextdate');
        } else {
          this.appointments.push(appointmentData);
          console.log(this.appointments);
          sessionStorage.setItem(this.id, JSON.stringify(this.appointments));
          sessionStorage.setItem("timeslots", JSON.stringify(this.timeslots));
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
