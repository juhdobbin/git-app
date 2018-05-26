import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../services/github.service';
import { LoginComponent } from '../login/login.component'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [LoginComponent]
})
export class UserComponent implements OnInit {

  code: String;
  showUserRepos: Boolean = false;
  userRepos: any;

  constructor(private route: ActivatedRoute, private githubService: GithubService , private loginComponent: LoginComponent) {
  }

  ngOnInit() {
    this.busca()
  }
  
  busca() {
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
      this.githubService.getAcessToken(this.code)
        .subscribe(data => {
          window.localStorage.setItem("token", JSON.stringify(data));
          this.getUserRepos(data);
        },
          err => { this.refreshToken() }
        );
    });   
  }

  getUserRepos(token){
    this.githubService.getUserRepositorios(token)
      .subscribe(data => this.resolveGetUserRepos(data),
      err => { this.refreshToken() }
      );
  }
  resolveGetUserRepos(data){
    this.userRepos = data;
    this.showUserRepos = true;

  }
  refreshToken(){
    window.location.href = this.loginComponent.clienteID;
  }
}
