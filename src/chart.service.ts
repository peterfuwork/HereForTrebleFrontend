import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';

export class ChartService {

  constructor(private _http: HttpClient) { }

  getUserData() {
    // return this._http.get('')
    //   .map(result => {
    //     console.log(result);
    //   });
  }

}
