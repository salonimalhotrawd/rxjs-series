import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { filter, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {

  public userList = [
    {id: 1, name: 'Saloni Malhotra', gender: 'Female'},
    {id: 2, name: 'Anmol Dogra', gender: 'Male'},
    {id: 3, name: 'Abhinav Sharma', gender: 'Male'},
    {id: 4, name: 'Kartik Malhotra', gender: 'Male'},
    {id: 5, name: 'Shweta Srivastava', gender: 'Female'},
    {id: 6, name: 'Neha', gender: 'Female'},
    {id: 7, name: 'Pallavi', gender: 'Female'},
    {id: 8, name: 'Sheffali Sharma', gender: 'Female'},
    {id: 9, name: 'Anish Nanda', gender: 'Male'},
    {id: 10, name: 'Sourav', gender: 'Male'}
  ];

  public userDatabyLength;
  public userDatabyGender;
  public userDatabynthItem;

  public apiCallSubscription: Subscription[] = [];

  constructor() { }

  ngOnInit() {
     const dataSource = from(this.userList);

    // Ex - 01 Filter by Length
    const sub = dataSource.pipe(
      filter(member => member.name.length > 8),
      toArray()
    ).subscribe(res => {
      this.userDatabyLength = res;
    });

    // Ex - 02 Filter by Gender
    const sub1 = dataSource.pipe(
      filter(x => x.gender === 'Male'),
      toArray()
    ).subscribe(res => {
      this.userDatabyGender = res;
    });

    // Ex - 03 Filter by nth Item
    const sub2 = dataSource.pipe(
      filter(x => x.id <= 6),
      toArray()
    ).subscribe(res => {
      this.userDatabynthItem = res;
    });

    this.apiCallSubscription.push(sub, sub1, sub2);
  }

  ngOnDestroy(): void {
    this.apiCallSubscription.forEach(x => x.unsubscribe());
  }

}
