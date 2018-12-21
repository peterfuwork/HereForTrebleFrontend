import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})

export class MatchesComponent implements OnInit {
  userId = null;
  otherUsersData: any = [];
  currentUserData: any = [];
  public Labels = ['Different', 'Match'];
  public Type = 'pie';
  public chartOptions: any = {
    legend : {
      labels : {
        fontColor : '#ffffff',
      }
    }
  };
  // public Data = [{data: [20, 80]}];
  // {data: [user.percentage, (100 - user.percentage)]}
  constructor(private httpClient: HttpClient) {
    this.userId = 3;
  }

  ngOnInit() {
    this.httpClient.get(`http://herefortreble.herokuapp.com/match/?user_id=${this.userId}`)
      .toPromise()
      .then(data => {
        this.otherUsersData = data;
      }).catch(console.log);
    this.httpClient.get(`http://herefortreble.herokuapp.com/users/${this.userId}`)
      .toPromise()
      .then(data => {
          this.currentUserData = data;
      })
      .catch(console.log);
  }

}
