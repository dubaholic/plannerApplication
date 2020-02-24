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

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get("username");
    this.currentLocation = sessionStorage.getItem("location");
    this.timeslots = JSON.parse(sessionStorage.getItem(this.username + this.currentLocation));
    console.log(this.timeslots);
  }

  toCalendar() {
    this.router.navigateByUrl('/calendar');
  }
}
