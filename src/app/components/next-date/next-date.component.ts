import { Component, OnInit } from '@angular/core';
import { TimeslotsService } from 'src/app/services/timeslots.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-next-date',
  templateUrl: './next-date.component.html',
  styleUrls: ['./next-date.component.css']
})
export class NextDateComponent implements OnInit {

  pipe = new DatePipe('en-US');

  constructor(
    private timeSloteService: TimeslotsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  timeslots: any[] = [];
  currentDate: any;
  yesterdayDate: any;
  tommorrowDate: any;
  id: any = [];
  passedDate: any;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    // this.passedDate = this.route.snapshot.paramMap.get("date");
    // const day = this.passedDate.substr(0,2);
    // const month = this.passedDate.substr(3,2) -1;
    // const year = this.passedDate.substr(6,4);

    this.currentDate = new Date();
    this.yesterdayDate = new Date();
    this.tommorrowDate = new Date();
    this.currentDate.setDate(this.currentDate.getDate() + 2);
    this.yesterdayDate.setDate(this.currentDate.getDate() - 1);
    this.tommorrowDate.setDate(this.currentDate.getDate() + 1);
    this.getAllTimeslots(this.id);
  }

  reserveAppointment(id: any) {
    this.currentDate.setDate(this.currentDate.getDate());
    // var formattedDate = this.pipe.transform(this.currentDate, 'dd-MM-yyyy');
    this.router.navigateByUrl('/nextdate/' + id);
  }

  appointmentDetails(id: any) {
    this.router.navigateByUrl('/appointment/' + id);
  }

  yesterday() {
    this.currentDate.setDate(this.currentDate.getDate() - 1);
    var formattedDate = this.pipe.transform(this.currentDate, 'dd-MM-yyyy');
    // this.router.navigateByUrl('/nextdate/'+formattedDate);
    this.router.navigateByUrl('/calendar');
  }

  tommorrow() {
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    // var formattedDate = this.pipe.transform(this.currentDate, 'dd-MM-yyyy');
    // console.log(formattedDate);
    // sessionStorage.setItem("currentDate", formattedDate);
    this.router.navigateByUrl('/nextdate');
  }

  getAllTimeslots(id: any) {
    this.currentDate.setDate(this.currentDate.getDate());
    // var formattedDate = this.pipe.transform(this.currentDate, 'dd-MM-yyyy');
    this.timeslots = JSON.parse(sessionStorage.getItem("timeslotsNextDay"));
    // this.timeslots = JSON.parse(sessionStorage.getItem(formattedDate));
    if (this.timeslots == null) {
      this.timeslots = [];
      this.timeSloteService.getJSON().subscribe(data => {
        this.timeslots = data;
        sessionStorage.setItem("timeslotsNextDay", JSON.stringify(this.timeslots));
        // sessionStorage.setItem(formattedDate, JSON.stringify(this.timeslots));
      })
    }
  }

}