import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userId = null;
  userInfoWithFavArtists: any = [];
  image = '';
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  checkForEdit = false;

  slideConfig = {
    'slidesToShow': 4,
    'slidesToScroll': 1,
    'autoplay': true,
    'speed': 600,
    'vertical': true,
    'responsive': [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          arrows: false,
          vertical: false,
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          vertical: false,
          dots: false
        }
      }
    ]
  };

  constructor(private httpClient: HttpClient) {
    this.userId = 1;
  }

  ngOnInit() {

        this.httpClient.get(`http://herefortreble.herokuapp.com/users/${this.userId}`)
        .toPromise()
        .then(data => {
          this.userInfoWithFavArtists = [data];
          this.image = this.userInfoWithFavArtists[0].avatar;
          this.firstName = this.userInfoWithFavArtists[0].first_name;
          this.lastName = this.userInfoWithFavArtists[0].last_name;
          this.email = this.userInfoWithFavArtists[0].email;
          this.password = this.userInfoWithFavArtists[0].password;

          console.log(this.userInfoWithFavArtists);
          this.httpClient.get(`http://herefortreble.herokuapp.com/joins/${this.userId}`)
          .toPromise()
          .then(data => {
              this.userInfoWithFavArtists = data;
              this.image = data[0].avatar;
              this.firstName = data[0].first_name;
              this.lastName = data[0].last_name;
              this.email = data[0].email;
              this.password = data[0].password;
          }).catch(console.log);

        });
  }

  onClickEdit(event: Event) {
    event.preventDefault();
    this.checkForEdit = true;
  }

  onClickSave(event: Event) {
    event.preventDefault();

    const newBody = {
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      password: this.password,
      avatar: this.image
    };
    this.httpClient.put(`http://herefortreble.herokuapp.com/users/${this.userId}`, JSON.stringify(newBody), {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        })
      })
      .toPromise()
      .then(data => {
          this.userInfoWithFavArtists = data;
          this.image = data[0].avatar;
          this.firstName = data[0].first_name;
          this.lastName = data[0].last_name;
          this.email = data[0].email;
          this.password = data[0].password;
      }).catch(console.log);
    this.checkForEdit = false;
  }
}
