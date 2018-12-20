import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  checkForEdit = false;

  slideConfig = {
    'slidesToShow': 4,
    'slidesToScroll': 1,
    'autoplay': true,
    'speed': 300,
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
        breakpoint: 885,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          dots: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: false
        }
      }
    ]
  };

  constructor(private httpClient: HttpClient) {
    this.userId = 1;
    this.httpClient.get(`http://herefortreble.herokuapp.com/joins/${this.userId}`)
    .toPromise()
    .then(data => {
      this.userInfoWithFavArtists = data;
      this.image = data[0].avatar;
      this.firstName = data[0].first_name;
      this.lastName = data[0].last_name;
      this.email = data[0].email;
      console.log(this.userInfoWithFavArtists);
    })
    .catch(console.log);
  }

  ngOnInit() {
  }

  onClickEdit(event: Event) {
    event.preventDefault();
    this.checkForEdit = true;
  }

  onClickSave(event: Event) {
    event.preventDefault();
    this.checkForEdit = false;
  }
}
