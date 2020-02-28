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

  currentLocation: any;
  timeslots: any[] = [];
  currentDate: any;
  yesterdayDate: any;
  tommorrowDate: any;
  id: any = [];
  passedDate: any;
  location: any =[];
  locationlist: any = [
    "location1",
    "location2",
    "location3",
    "location4",
  ]

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.location = sessionStorage.getItem("location");
    if(this.location == null) {
      this.location = "location1";
      sessionStorage.setItem("location", "location1");
    }
    this.currentDate = new Date();
    this.yesterdayDate = new Date();
    this.tommorrowDate = new Date();
    this.currentDate.setDate(this.currentDate.getDate() + 2);
    this.yesterdayDate.setDate(this.currentDate.getDate() - 1);
    this.tommorrowDate.setDate(this.currentDate.getDate() + 1);
    this.getAllTimeslots();
  }

  reserveAppointment(id: any) {
    this.currentDate.setDate(this.currentDate.getDate());
    this.router.navigateByUrl('/nextdate/' + id);
  }

  appointmentDetails(id: any) {
    this.router.navigateByUrl('/appointment/' + id);
  }

  yesterday() {
    this.currentDate.setDate(this.currentDate.getDate() - 1);
    var formattedDate = this.pipe.transform(this.currentDate, 'dd-MM-yyyy');
    this.router.navigateByUrl('/calendar');
  }

  tommorrow() {
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    this.router.navigateByUrl('/nextdate');
  }

  getAllTimeslots() {
    this.currentLocation = sessionStorage.getItem("location");
    this.currentDate.setDate(this.currentDate.getDate());
    this.timeslots = JSON.parse(sessionStorage.getItem(this.currentLocation + "timeslotsNextDay"));
    if (this.timeslots == null) {
      this.timeslots = [];
      this.timeSloteService.getJSON().subscribe(data => {
        this.timeslots = data;
        sessionStorage.setItem(this.currentLocation + "timeslotsNextDay", JSON.stringify(this.timeslots));
      })
    }
  }

  onChange() {
    sessionStorage.setItem("location", this.location);
    this.getAllTimeslots();
  }

  addSlots(id: any) {
    var nextDate = "nextdate"
    this.router.navigateByUrl('/addtimeslot/'+ nextDate + "/" +id);
  }

  mySchedule(){
    var username = sessionStorage.getItem("username");
    this.router.navigateByUrl('/myschedule/'+username);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/');
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
}
