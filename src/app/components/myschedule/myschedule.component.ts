import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-myschedule',
  templateUrl: './myschedule.component.html',
  styleUrls: ['./myschedule.component.css']
})
export class MyscheduleComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  timeslots: any = [];
  username: any;

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get("username");
    this.timeslots = JSON.parse(sessionStorage.getItem(this.username));
    console.log(this.timeslots);
  }

}
