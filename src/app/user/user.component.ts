import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubService } from '../services/github.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [LoginComponent]
})
export class UserComponent implements OnInit {

  private code: String;
  private showUserRepos: Boolean = false;
  private userRepos: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private githubService: GithubService,
    private loginComponent: LoginComponent
  ) { }

  ngOnInit() {
    const token = window.localStorage.getItem('token');
    this.getUserRepos(token);
  }

  getAcessToken() {
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];

      this.githubService.getAcessToken(this.code)
        .subscribe(
          data => {
            const token = this.getParameterByName('access_token', data);

            if (this.getParameterByName('error', data)) {
              this.refreshToken();
              return;
            }

            this.getUserRepos(token);
          },
          err => this.refreshToken()
        );
    });
  }

  getUserRepos(token) {
    if (token) {
      token = token.replace(/\\|"/g, '');
    }
    window.localStorage.setItem('token', JSON.stringify(token));

    this.githubService.getUserRepositorios(token)
      .subscribe(
        data => this.resolveGetUserRepos(data),
        err => this.getAcessToken()
      );
  }

  resolveGetUserRepos(data) {
    this.userRepos = data;
    this.showUserRepos = true;
  }

  refreshToken() {
    window.location.href = this.loginComponent.clienteID;
  }

  getParameterByName(name, url) {
    if (!url) { url = window.location.href; }

    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);

    if (!results) { return null; }
    if (!results[2]) { return ''; }

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  logout() {
    window.localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
