import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, fromEvent, interval, Subscription, timer } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { map, takeLast, takeUntil } from 'rxjs/operators';
import { DesignUtilityService } from './../../services/design-utility.service';

@Component({
  selector: 'app-take',
  templateUrl: './take.component.html',
  styleUrls: ['./take.component.scss']
})
export class TakeComponent implements OnInit, OnDestroy {

  public userNameList = ['Saloni Malhotra', 'Anmol Dogra', 'Sanshs Sharma', 'Ronku', 'Neha', 'Rishi', 'Poonam', 'Devik', 'Rudraksh', 'Ajay'];

  public apiCallSubscription: Subscription[] = [];

  constructor(private _designUtilityService: DesignUtilityService) { }

  ngOnInit() {
    const source = interval(1000);
    const nameSource = from(this.userNameList);

    // Ex-01 take
    const takeSub = nameSource.pipe(
      take(5)
    ).subscribe(res => {
      this._designUtilityService.appendElement(res, 'elContainerTake');
    });

    // Ex-02 takeLast
    const takeLastSub = nameSource.pipe(
      takeLast(3)
    ).subscribe(res => {
      this._designUtilityService.appendElement(res, 'elContainerTakeLast');
    });

    // Ex-03 takeLastUntil
    const condition1 = timer(5000);
    const condition2 =  fromEvent(document, 'click');

    const takeLastUntilSub = source.pipe(
      takeUntil(condition2)
     ).subscribe(res => {
      this._designUtilityService.appendElement(res, 'elContainerTakeUntil');
    });

    this.apiCallSubscription.push(takeSub, takeLastSub, takeLastUntilSub);
  }

  ngOnDestroy(): void {
    this.apiCallSubscription.forEach(x => x.unsubscribe());
  }

}
