import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { $ } from 'protractor';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-addtimeslot',
  templateUrl: './addtimeslot.component.html',
  styleUrls: ['./addtimeslot.component.css']
})
export class AddtimeslotComponent implements OnInit {

  belowZeroDialogComponent: MatDialogRef<BelowZeroDialogComponent>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
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
  currentLocation: any;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    var routing = this.route.snapshot.paramMap.get("nextdate");
    this.currentLocation = sessionStorage.getItem("location")
    if (routing != null) {
      this.timeslots = JSON.parse(sessionStorage.getItem(this.currentLocation + 'timeslotsNextDay'));
      for (let timeslot of this.timeslots) {
        if (timeslot.id == this.id) {
          this.timeslot = timeslot;
          return timeslot;
        }
      }
    } else {
      this.timeslots = JSON.parse(sessionStorage.getItem(this.currentLocation + "timeslots"));
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
    if (routing != null) {
      this.timeslots = JSON.parse(sessionStorage.getItem(this.currentLocation + 'timeslotsNextDay'))
      for (let timeslot of this.timeslots) {
        if (timeslot.id == this.id) {
          this.amount = appointmentData.amount;
          var total = timeslot.slots + this.amount;
          if (total < 0) {
            this.openDialog();
          } else {
            timeslot.slots = total;
            this.timeslots[this.id] = timeslot;
            sessionStorage.setItem(this.currentLocation + "timeslotsNextDay", JSON.stringify(this.timeslots));
            this.router.navigateByUrl('/nextdate');
          }

        }
      }
      this.timeslotForm.reset();
    } else {
      this.timeslots = JSON.parse(sessionStorage.getItem(this.currentLocation + "timeslots"));
      for (let timeslot of this.timeslots) {
        if (timeslot.id == this.id) {
          this.amount = appointmentData.amount;
          var total = timeslot.slots + this.amount;
          if (total < 0) {
            this.openDialog();
          } else {
            timeslot.slots = total;
            this.timeslots[this.id] = timeslot;
            sessionStorage.setItem(this.currentLocation + "timeslots", JSON.stringify(this.timeslots));
            this.router.navigateByUrl('/calendar');
          }
        }
      }
      this.timeslotForm.reset();
    }
  }

  openDialog() {
    this.dialog.open(BelowZeroDialogComponent, {
      hasBackdrop: false
    });
  }
}

@Component({
  selector: 'dialog-below-zero',
  templateUrl: 'dialog-below-zero.html',
})
export class BelowZeroDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<BelowZeroDialogComponent>,
    ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
