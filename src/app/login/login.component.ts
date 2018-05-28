import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public clienteID = 'https://github.com/login/oauth/authorize?scope=user:email&client_id=69313785142bc40b0307';
  constructor() { }

  ngOnInit() {

  }

}
