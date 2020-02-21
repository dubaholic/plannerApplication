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

  timeslots: any[] = [];
  currentDate: any;
  tommorrowsDate: any;
  id:any = [];
  backgroundColor;

  ngOnInit() {
      this.id = this.route.snapshot.paramMap.get("id");
      this.currentDate = new Date();
      this.tommorrowsDate = new Date();
      this.currentDate.setDate(this.currentDate.getDate() + 1);
      sessionStorage.setItem('currentDate', this.currentDate);
      this.tommorrowsDate.setDate(this.currentDate.getDate() + 1);
      this.getAllTimeslots();
    }

  reserveAppointment(id: any) {
    this.router.navigateByUrl('/calendar/' + id);
  }

  appointmentDetails(id: any) {
    this.router.navigateByUrl('/appointment/' + id);
  }

  getAllTimeslots() {
    this.timeslots = JSON.parse(sessionStorage.getItem("timeslots"));
    if (this.timeslots == null) {
      this.timeslots = [];
      this.timeSloteService.getJSON().subscribe(data => {
        this.timeslots = data;
        sessionStorage.setItem("timeslots", JSON.stringify(this.timeslots));
      })
    }
  }

  tommorrow() {
    this.currentDate.setDate(this.currentDate.getDate() + 2);
    this.router.navigateByUrl('/nextdate');
  }

  // tommorrow() {
  //   this.currentDate.setDate(this.currentDate.getDate() + 1);
  //   var formattedDate = this.pipe.transform(this.currentDate, 'dd-MM-yyyy');
  //   console.log(formattedDate);
  //   this.router.navigateByUrl('/nextdate/'+formattedDate);
  // }
}
