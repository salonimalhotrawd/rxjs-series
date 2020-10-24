import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, from, Subscription, of } from 'rxjs';
import { take, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-to-array',
  templateUrl: './to-array.component.html',
  styleUrls: ['./to-array.component.scss']
})
export class ToArrayComponent implements OnInit, OnDestroy {

  public userList = [
    {name : 'Saloni Malhotra' , profile: 'MEAN Stack Developer'},
    {name : 'Shweta Srivastava' , profile: 'MEAN Stack Developer'},
    {name : 'Sagar Kanojia' , profile: 'JAVA Developer'},
    {name : 'Abhinav' , profile: 'Professor'},
    {name : 'Anmol Dogra' , profile: 'Highway Enginner'}
  ];

  public showIntervalResponse;
  public showArrayResponse;
  public showStringResponse;

  public callSubscription: Subscription[] = [];

  constructor() { }

  ngOnInit() {

    // Ex 01 - toArray through Interval
    const source = interval(1000);
    const sub = source.pipe(take(10), toArray()).subscribe(res => {
      this.showIntervalResponse = res;
    });

    // Ex 02 - toArray through Array & get Data as Same Response
    const arraySource = from(this.userList);
    const sub1 = arraySource.pipe(toArray()).subscribe(res => {
      this.showArrayResponse = res;
    });

    // Ex 03 - toArray - String Conversion
    const stringSource = of('Saloni', 'Malhotra', 'Developer');
    const sub2 = stringSource.pipe(toArray()).subscribe(res => {
      this.showStringResponse = res;
    });
    this.callSubscription.push(sub, sub1, sub2);
  }

  ngOnDestroy(): void {
    this.callSubscription.forEach(x => x.unsubscribe());
  }

}
