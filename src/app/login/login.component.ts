import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  clienteID = 'https://github.com/login/oauth/authorize?scope=user:email&client_id=69313785142bc40b0307';
  constructor( private loginService : LoginService ) { }

  ngOnInit() {
  }
//  login() {  
//    this.loginService.login()
//      .subscribe(data => { console.log(data); },
//        err => { console.log(err); }
//      );


//   }
}
