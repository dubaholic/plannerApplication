import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointmentdetails',
  templateUrl: './appointmentdetails.component.html',
  styleUrls: ['./appointmentdetails.component.css']
})
export class AppointmentdetailsComponent implements OnInit {

  pipe = new DatePipe('en-US');
  
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  id:any;
  appointments: any = [];
  currentDate: Date;
  timeslots: any;
  timeslot:any;
  passedDate: any;
  currentLocation; any;

  ngOnInit() {
    // this.currentDate = new Date();
    this.id = this.route.snapshot.paramMap.get("id");
    
    // this.passedDate = this.route.snapshot.paramMap.get("date");
    // const day = this.passedDate.substr(0,2);
    // const month = this.passedDate.substr(3,2) -1;
    // const year = this.passedDate.substr(6,4);

    // this.currentDate = new Date(year, month, day);
    // var formattedDate = this.pipe.transform(this.currentDate, 'dd-MM-yyyy');
    // this.appointments = JSON.parse(sessionStorage.getItem(formattedDate));
    // // this.appointments = JSON.parse(sessionStorage.getItem("timeslots"));
    // console.log(this.appointments);
    this.getTimeslotDetails();
  }

  getTimeslotDetails() {
    // var formattedDate = this.pipe.transform(this.currentDate, 'dd-MM-yyyy');
    // this.timeslots = JSON.parse(sessionStorage.getItem(formattedDate));
    // // this.timeslots = JSON.parse(sessionStorage.getItem("timeslots"));
    // for(let timeslot of this.timeslots) {
    //   if(timeslot.id == this.id) {
    //     this.timeslot = timeslot.timePeriod;
    //   }
    // }
    this.currentLocation = sessionStorage.getItem("location");
    console.log(this.currentLocation);
    this.appointments = JSON.parse(sessionStorage.getItem(this.currentLocation +this.id));
    console.log(this.appointments);
  }

  toCalendar() {
    this.router.navigateByUrl('/calendar');
  }

}
