import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addtimeslot',
  templateUrl: './addtimeslot.component.html',
  styleUrls: ['./addtimeslot.component.css']
})
export class AddtimeslotComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  timeslots: any;
  id :any
  timeslot: any = [];
  ngOnInit() {
    this.timeslots = JSON.parse(sessionStorage.getItem("timeslots"));
    this.id = this.route.snapshot.paramMap.get("id");
    for(let item of this.timeslots) {
      if(item.id == this.id) {
        this.timeslot = item;
        console.log(this.timeslot)
        return this.timeslot;
      }
    }
  }

}
