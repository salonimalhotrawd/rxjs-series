import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, timer } from 'rxjs';
import { DesignUtilityService } from './../../services/design-utility.service';

@Component({
  selector: 'app-interval',
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.scss']
})
export class IntervalComponent implements OnInit, OnDestroy {

  public allSubscription: Subscription[] = [];
  public userList;

  constructor(private _designUtilityService: DesignUtilityService) { }

  ngOnInit() {
    // const broadCastUsers = interval(2000);
    // Timer takes two parameters delay and interval
    const broadCastUsers = timer(5000, 2000);
    let count = 1;
    const allSubscription = broadCastUsers.subscribe(res => {
       const userList = 'User-' + count;
       this._designUtilityService.appendElement(userList, 'elContainer');
       this._designUtilityService.appendElement(userList, 'elContainer2');
       this._designUtilityService.appendElement(userList, 'elContainer3');
       count++;

       if (count == 11) {
        allSubscription.unsubscribe();
       }
    });
  }

  ngOnDestroy(): void {
    this.allSubscription.forEach(x => x.unsubscribe());
  }

}
