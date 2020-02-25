import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    })
  }

  ngOnInit() {
  }

  onSubmit(loginData) {
    if (loginData.username == 'admin' && loginData.password == "test") {
      sessionStorage.setItem("username", loginData.username);
      this.router.navigateByUrl('/calendar');
    } 
    if(loginData.username == 'user' && loginData.password == "test") {
      sessionStorage.setItem("username", loginData.username);
      this.router.navigateByUrl('/calendar');
    }
  }
}
