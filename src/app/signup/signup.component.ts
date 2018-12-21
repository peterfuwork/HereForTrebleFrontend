import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  image = '';
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  onSubmitForm(event: Event) {
    event.preventDefault();
    const newBody = {
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      password: this.password,
      avatar: this.image
    };
    this.httpClient.post('http://herefortreble.herokuapp.com/users', JSON.stringify(newBody), {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }).toPromise()
    .then(data => {
        this.image = '';
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.password = '';
    });
  }

}
