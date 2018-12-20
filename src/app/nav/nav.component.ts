import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onMobileNavToggle(event: Event) {
    event.preventDefault();
    (<HTMLInputElement>event.target).parentElement.nextElementSibling.classList.toggle('active');
  }

  removeActive(event: Event) {
    event.preventDefault();
    (<HTMLInputElement>event.target).parentElement.parentElement.classList.toggle('active');
  }


}
