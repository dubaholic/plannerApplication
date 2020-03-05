import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-myschedule',
  templateUrl: './myschedule.component.html',
  styleUrls: ['./myschedule.component.css']
})
export class MyscheduleComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  timeslots: any = [];
  username: any;
  currentLocation: any;
  currentAppointment: any;

  locationtimeslots: any;

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get("username");
    this.currentLocation = sessionStorage.getItem("location");
    this.timeslots = JSON.parse(sessionStorage.getItem(this.username));
    console.log(this.timeslots);
  }

  toCalendar() {
    this.router.navigateByUrl('/calendar');
  }

  deleteAppointment(item :any){
    var index = 0;
    this.currentAppointment = JSON.parse(sessionStorage.getItem(this.username));
    this.locationtimeslots = JSON.parse(sessionStorage.getItem(item.location+"timeslots"));
    for(let appointment of this.currentAppointment) {
      if(appointment.transportReference == item.transportReference) {
        this.currentAppointment.splice(index, 1);
        sessionStorage.setItem(this.username, JSON.stringify(this.currentAppointment));
      }
      index = index +1;
    }

    for(let timeslot of this.locationtimeslots) {
      if(item.timeslot == timeslot.timePeriod) {
          timeslot.slots++;
          this.locationtimeslots[timeslot.index] = timeslot;
          sessionStorage.setItem(item.location+"timeslots", JSON.stringify(this.locationtimeslots));
            
      }
    }

    this.router.navigateByUrl('/calendar');
  }
}
