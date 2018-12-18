import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  slideConfig = {
    'slidesToShow': 3,
    'slidesToScroll': 1,
    'autoplay': true,
    'dots': true,
    'speed': 300,
    'responsive': [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 885,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
          dots: false
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


  public artistsArr: any = [];
  public artistsObj: any = {};
  public showSpinner = true;
  artist_name = 'taylor';
  private _url = `https://spotify-graphql-server.herokuapp.com/graphql?query=%7B%0A%20%20queryArtists(byName%3A%22${this.artist_name}%22)%20%7B%0A%20%20%20%20name%0A%20%20%20%20id%0A%20%20%20%20image%0A%20%20%7D%0A%7D%0A`;
  constructor(private httpClient: HttpClient) {
    this.httpClient.get(this._url)
    .toPromise()
    .then(data => {
      this.showSpinner = false;
      this.artistsObj = data;
      this.artistsArr = this.artistsObj.data.queryArtists;
      console.log(this.artistsArr);
    })
    .catch(console.log);
  }
  ngOnInit() {
  }
  onSearchArtist(event: Event) {
    this.artist_name = (<HTMLInputElement>event.target).value;
    this._url = `https://spotify-graphql-server.herokuapp.com/graphql?query=%7B%0A%20%20queryArtists(byName%3A%22${this.artist_name}%22)%20%7B%0A%20%20%20%20name%0A%20%20%20%20id%0A%20%20%20%20image%0A%20%20%7D%0A%7D%0A`;
    this.httpClient.get(this._url)
    .toPromise()
    .then(data => {
      this.showSpinner = false;
      this.artistsObj = data;
      this.artistsArr = this.artistsObj.data.queryArtists;
      console.log(this.artistsArr);
    })
    .catch(console.log);
  }
  afterChange(e) {
    console.log('afterChange');
  }

}
