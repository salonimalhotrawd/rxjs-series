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
    { 'id': 2 , 'observableName': 'From Event', 'routerName': 'from-event'},
    { 'id': 3 , 'observableName': 'From Event', 'routerName': 'from-event'},
    { 'id': 4 , 'observableName': 'From Event', 'routerName': 'from-event'},
    { 'id': 5 , 'observableName': 'From Event', 'routerName': 'from-event'},
    { 'id': 6 , 'observableName': 'From Event', 'routerName': 'from-event'},
    { 'id': 7 , 'observableName': 'From Event', 'routerName': 'from-event'}
  ];

  ngOnInit() {
  }

  public navigateToRoute(event): void {
    const url = '../observable/' + event;
    this._router.navigate([url]);
  }

}
