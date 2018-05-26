import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Jsonp } from '@angular/http';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService { 
  constructor(private jsonp: Jsonp, private http: Http) { }

   getAcessToken(code): Observable<String> {
    let obj = {
      "client_id": "69313785142bc40b0307",
      "client_secret": "715ae25e291e1aa2a42694c4ce1c97f11b4e9de3",
      "code": code
    }   
    console.log(obj);
    // tslint:disable-next-line:max-line-length
    return this.http.post(`/login/oauth/access_token`, obj)
      .pipe(map(response => response.text()));
   
  }
  getUserRepositorios(token): Observable<any> {
    return this.http.get(`/user/repos?${token}`)
      .pipe(map(response => response.json()));
  }
}
