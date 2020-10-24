import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { pluck, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-pluck',
  templateUrl: './pluck.component.html',
  styleUrls: ['./pluck.component.scss']
})
export class PluckComponent implements OnInit, OnDestroy {

  public pluckData;
  public pluckDataByNestedProp;

  public userList = [
    { name: 'Saloni Malhotra', job: { profile: 'MEAN Stack Developer', exp: '4 years' } },
    { name: 'Anmol Dogra', job: { profile: 'Highway Enginner', exp: '4 years' } },
    { name: 'Shweta Srivastava', job: { profile: 'MEAN Stack Developer', exp: '4 years' } },
    { name: 'Sagar Kanojia', job: { profile: 'JAVA Developer', exp: '4 years' } },
    { name: 'Abhinav', job: { profile: 'Professor', exp: '2 years' } }
  ];

  public apiCallSubscription: Subscription[] = [];

  constructor() { }

  ngOnInit() {

    // Ex 01 - Pluck transform Object Property
    const pluckSub = from(this.userList).pipe(
      pluck('name'), toArray()
    ).subscribe(res => {
      this.pluckData = res;
    });

    // Ex 02 - Pluck transform Object Property
    const pluckSubNestedProp = from(this.userList).pipe(
      pluck('job', 'profile'), toArray()
    ).subscribe(res => {
      this.pluckDataByNestedProp = res;
    });


    this.apiCallSubscription.push(pluckSub, pluckSubNestedProp);
  }

  ngOnDestroy(): void {
    this.apiCallSubscription.forEach(x => x.unsubscribe());
  }

}
