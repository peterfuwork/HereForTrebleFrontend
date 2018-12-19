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

  userId = null;
  userInfoWithFavArtists: any = [];
  userFavArtists: any = [];
  public artistsArr: any = [];
  public artistsObj: any = {};
  public showSpinner = true;
  artist_name = 'taylor';
  public postArtistsArr: any = [];
  private _url = `https://spotify-graphql-server.herokuapp.com/graphql?query=%7B%0A%20%20queryArtists(byName%3A%22${this.artist_name}%22)%20%7B%0A%20%20%20%20name%0A%20%20%20%20id%0A%20%20%20%20image%0A%20%20%7D%0A%7D%0A`;
  constructor(private httpClient: HttpClient) {
    this.userId = 4;
    this.httpClient.get(this._url)
    .toPromise()
    .then(data => {
      this.showSpinner = false;
      this.artistsObj = data;
      this.artistsArr = this.artistsObj.data.queryArtists;
      console.log('this.artistsArr', this.artistsArr);
    })
    .catch(console.log);
  }
  ngOnInit() {
    this.httpClient.get(`http://herefortreble.herokuapp.com/joins/${this.userId}`)
    .toPromise()
    .then(data => {
      this.userInfoWithFavArtists = data;
      this.userInfoWithFavArtists.map(artist => {
        this.userFavArtists.push((artist.artist_name).toLowerCase().replace(/ /g, ''));
      });
        console.log(this.userFavArtists);
    })
    .catch(console.log);
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
  onSaveArtist(event: Event, id: number, name: string, image: string) {
    (<HTMLInputElement>event.target).parentElement.classList.toggle('active');
    const result = this.postArtistsArr.find( artist => artist.id === id );
    console.log('result', result);
    if (!result) {
      this.postArtistsArr.push({
        id,
        name,
        image
      });
    } else {
      // remove the artist from postArtistsArr
      for (let i = 0; i < this.postArtistsArr.length; i++) {
        if (this.postArtistsArr[i].id === id) {
          this.postArtistsArr.splice(i, 1);
            break;
        }
      }
    }
    console.log(this.postArtistsArr);
  }
  afterChange(e) {
    console.log('afterChange');
  }

}
