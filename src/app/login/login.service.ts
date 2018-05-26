import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LoginModel } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  clienteID =  '69313785142bc40b0307';
  clienteSecret = '715ae25e291e1aa2a42694c4ce1c97f11b4e9de3'

  constructor(private http: Http) { }

  login(): Observable<LoginModel[]> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`https://github.com/login/oauth/authorize?scope=user:email&client_id=${this.clienteID}`)    
      .pipe(map(response => response.json()));
  }
  
}
