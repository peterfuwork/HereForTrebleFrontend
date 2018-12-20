import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

  constructor() { }

  public Labels = ['Matched', 'different'];
  public Type = 'doughnut';
  public Data = [
    {data: [80, 20]},
    // {data: [user.percentage, (100 - user.percentage)]}
  ];

  ngOnInit() {
    
  }

}