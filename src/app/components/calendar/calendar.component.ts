import { Component, OnInit } from '@angular/core';
import { TimeslotsService } from 'src/app/services/timeslots.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  pipe = new DatePipe('en-US');


  constructor(
    private timeSloteService: TimeslotsService,
    private route: ActivatedRoute,
    private router: Router) { }

  location: any =[];
  timeslots: any[] = [];
  currentDate: any;
  tommorrowsDate: any;
  id: any = [];
  backgroundColor;
  currentLocation: any;
  locationlist: any = [
    "location1",
    "location2",
    "location3",
    "location4",
  ]

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.currentDate = new Date();
    this.tommorrowsDate = new Date();
    this.location = sessionStorage.getItem("location");
    if(this.location == null) {
      this.location = "location1";
      sessionStorage.setItem("location", "location1");
    }
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    sessionStorage.setItem('currentDate', this.currentDate);
    this.tommorrowsDate.setDate(this.currentDate.getDate() + 1);
    this.getAllTimeslots();
  }

  reserveAppointment(id: any) {
    console.log(this.pipe.transform(this.currentDate, 'shortDate'));
    this.router.navigateByUrl('/calendar/' + id);
  }

  appointmentDetails(id: any) {
    this.router.navigateByUrl('/appointment/' + id);
  }

  getAllTimeslots() {
    this.currentLocation = sessionStorage.getItem("location");
    if(this.currentLocation == null) {
      this.currentLocation = 'location1';
    }
    this.timeslots = JSON.parse(sessionStorage.getItem(this.currentLocation + "timeslots"));
    if (this.timeslots == null) {
      this.timeslots = [];
      this.timeSloteService.getJSON().subscribe(data => {
        this.timeslots = data;
        sessionStorage.setItem(this.currentLocation + "timeslots", JSON.stringify(this.timeslots));
      })
    }
  }

  tommorrow() {
    this.currentDate.setDate(this.currentDate.getDate() + 2);
    this.router.navigateByUrl('/nextdate');
  }

  addSlots(id: any) {
    this.router.navigateByUrl('/addtimeslot/' + id);
  }

  mySchedule() {
    var username = sessionStorage.getItem("username");
    this.router.navigateByUrl('/myschedule/' + username);
  }
  
  onChange() {
    sessionStorage.setItem("location", this.location);
    this.getAllTimeslots();
  }

  permissionCheck() {
    var username = sessionStorage.getItem("username");
    if(username == 'admin') {
      return true;
    }
    else {
      return false;
    }
  }
  // tommorrow() {
  //   this.currentDate.setDate(this.currentDate.getDate() + 1);
  //   var formattedDate = this.pipe.transform(this.currentDate, 'dd-MM-yyyy');
  //   console.log(formattedDate);
  //   this.router.navigateByUrl('/nextdate/'+formattedDate);
  // }
}
