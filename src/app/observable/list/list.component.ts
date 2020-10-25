import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(public _router: Router) { }

  public ObservableList = [
    { 'id': 1 , 'observableName': 'From Event', 'routerName': 'from-event'},
    { 'id': 2 , 'observableName': 'Interval/Timer', 'routerName': 'interval-timer'},
    { 'id': 3 , 'observableName': 'of and from', 'routerName': 'of-from'},
    { 'id': 4 , 'observableName': 'toArray', 'routerName': 'toArray'},
    { 'id': 5 , 'observableName': 'Custom Observable', 'routerName': 'custom'},
    { 'id': 6 , 'observableName': 'Map', 'routerName': 'map'},
    { 'id': 7 , 'observableName': 'Pluck', 'routerName': 'pluck'},
    { 'id': 8 , 'observableName': 'Filter', 'routerName': 'filter'},
    { 'id': 9 , 'observableName': 'Take, TakeLast and TakeUntil', 'routerName': 'take'},
    { 'id': 10 , 'observableName': 'Retry, RetryWhen Scan and Delay', 'routerName': 'retry'}
  ];

  ngOnInit() {
  }

  public navigateToRoute(event): void {
    const url = '../observable/' + event;
    this._router.navigate([url]);
  }
}
