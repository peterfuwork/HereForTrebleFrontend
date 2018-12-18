import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }
  afterChange(e) {
    console.log('afterChange');
  }
}
