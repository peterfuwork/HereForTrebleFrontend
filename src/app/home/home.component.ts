import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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
    'speed': 600,
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
  artist_name = 'Taylor';
  private _url = `https://spotify-graphql-server.herokuapp.com/graphql?query=%7B%0A%20%20queryArtists(byName%3A%22${this.artist_name}%22)%20%7B%0A%20%20%20%20name%0A%20%20%20%20id%0A%20%20%20%20image%0A%20%20%7D%0A%7D%0A`;
  constructor(private httpClient: HttpClient) {
    this.userId = 1;
  }

  ngOnInit() {
    this.httpClient.get(`http://herefortreble.herokuapp.com/joins/${this.userId}`)
    .toPromise()
    .then(data => {
      this.userInfoWithFavArtists = data;
      this.userInfoWithFavArtists.map(artist => {
        this.userFavArtists.push((artist.spotify_id));
      });
        console.log('userFavArtists', this.userFavArtists);
    })
    .catch(console.log);

    this.httpClient.get(this._url)
    .toPromise()
    .then(data => {
      this.showSpinner = false;
      this.artistsObj = data;
      this.artistsArr = this.artistsObj.data.queryArtists.map(artist => {
        const newObj = Object.assign({}, artist);
        for (let i = 0; i < this.userFavArtists.length; i++) {
          if (newObj.liked !== true) {
            if (this.userFavArtists[i] === newObj.id) {
              newObj.liked = true;
            } else {
              newObj.liked = false;
            }
          }
        }
        return newObj;
      });
      console.log('this.artistsArr', this.artistsArr);
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
      console.log('userFavArtists', this.userFavArtists);
      this.artistsArr = this.artistsObj.data.queryArtists.map(artist => {
        const newObj = Object.assign({}, artist);
        for (let i = 0; i < this.userFavArtists.length; i++) {
          if (newObj.liked !== true) {
            if (this.userFavArtists[i] === newObj.id) {
              newObj.liked = true;
            } else {
              newObj.liked = false;
            }
          }
        }
        return newObj;
      });
      console.log(this.artistsArr);
    })
    .catch(console.log);
  }

  onSaveArtist(event: Event, artist_name: string, artist_img: string, spotify_id: string) {
    (<HTMLInputElement>event.target).parentElement.classList.toggle('active');
    const newBody = {
      artist_name,
      artist_img,
      spotify_id
    };
    const joinBody = {
      user_id: this.userId,
      spotify_id
    };

    this.httpClient.post('http://herefortreble.herokuapp.com/artists', JSON.stringify(newBody), {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }).toPromise()
    .then(data => {
      this.httpClient.post('http://herefortreble.herokuapp.com/joins', JSON.stringify(joinBody), {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      }).toPromise()
      .then(data => {
        console.log(data);
      });
    });

    const i = this.artistsArr.findIndex((artist) => {
      return artist.id === spotify_id;
    });

    for (let x = 0; x < this.artistsArr.length; x++) {
      if (this.artistsArr[i].hasOwnProperty('liked')) {
        this.artistsArr[i].liked = true;
      }
    }

    this.userFavArtists.push(spotify_id);

    console.log(i);
    console.log('artistsArr', this.artistsArr);
  }
  onUnsaveArtist(event: Event, spotify_id: string) {

    this.httpClient.get(`http://herefortreble.herokuapp.com/joins/`)
    .toPromise()
    .then(data => {
      if (Array.isArray(data)) {
        const currentUserData = data.filter(user => {
          return user.user_id === this.userId;
        });
        console.log('data', currentUserData);

        const i = this.artistsArr.findIndex((artist) => {
          return artist.id === spotify_id;
        });
        for (let x = 0; x < this.artistsArr.length; x++) {
          if (this.artistsArr[i].hasOwnProperty('liked')) {
            this.artistsArr[i].liked = false;
          }
        }

        const join_obj = currentUserData.filter(function(obj) {
          return obj.spotify_id === spotify_id;
        });

        console.log('join_obj[0].id', join_obj[0].id);
        this.httpClient.delete(`http://herefortreble.herokuapp.com/joins/${join_obj[0].id}`, {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
        }).toPromise()
        .then(data => {
          const index = this.userFavArtists.indexOf(spotify_id);
          this.userFavArtists.splice(index, 1);
          console.log(data);
        });

      }
      console.log('artistsArr', this.artistsArr);
    });
  }
}
