import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../services/github.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  code: string;

  constructor(private route: ActivatedRoute, private githubService: GithubService) {
  }

  ngOnInit() {
      

  }
    busca(){
      this.route.queryParams.subscribe(params => {
        this.code = params['code'];
        this.githubService.getAcessToken(this.code)
          .subscribe(data => { console.log(data); },
            err => { console.log(err); }
          );
      });
    }


}
