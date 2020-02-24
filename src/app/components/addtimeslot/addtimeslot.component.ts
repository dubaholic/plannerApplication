import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { $ } from 'protractor';

@Component({
  selector: 'app-addtimeslot',
  templateUrl: './addtimeslot.component.html',
  styleUrls: ['./addtimeslot.component.css']
})
export class AddtimeslotComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.timeslotForm = this.formBuilder.group({
      amount: '',
    })
  }

  timeslotForm
  timeslots: any;
  timeslotsNextDay: any;
  id: any
  timeslot: any = [];
  amount: number;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    var routing = this.route.snapshot.paramMap.get("nextdate");
    if(routing != null) {
      this.timeslots = JSON.parse(sessionStorage.getItem('timeslotsNextDay'));
      for (let timeslot of this.timeslots) {
        if (timeslot.id == this.id) {
          this.timeslot = timeslot;
          return timeslot;
        }
      }
    } else {
      this.timeslots = JSON.parse(sessionStorage.getItem("timeslots"));
      for (let timeslot of this.timeslots) {
        if (timeslot.id == this.id) {
          this.timeslot = timeslot;
          return timeslot;
        }
      }
    }
    
  }

  onSubmit(appointmentData) {
    this.id = this.route.snapshot.paramMap.get("id");

    var routing = this.route.snapshot.paramMap.get("nextdate");
    console.log(routing);
    if (routing != null) {
      this.timeslots = JSON.parse(sessionStorage.getItem('timeslotsNextDay'))
      for (let timeslot of this.timeslots) {
        if (timeslot.id == this.id) {
          this.amount = appointmentData.amount;
          var total = timeslot.slots + this.amount;
          timeslot.slots = total;
          this.timeslots[this.id] = timeslot;
          sessionStorage.setItem("timeslotsNextDay", JSON.stringify(this.timeslots));
          this.router.navigateByUrl('/nextdate');
        }
      }
      this.timeslotForm.reset();
    } else {
      this.timeslots = JSON.parse(sessionStorage.getItem("timeslots"));
      for (let timeslot of this.timeslots) {
        if (timeslot.id == this.id) {
          this.amount = appointmentData.amount;
          var total = timeslot.slots + this.amount;
          timeslot.slots = total;
          this.timeslots[this.id] = timeslot;
          sessionStorage.setItem("timeslots", JSON.stringify(this.timeslots));
          this.router.navigateByUrl('/calendar');
        }
      }
      this.timeslotForm.reset();
    }
  }

}
