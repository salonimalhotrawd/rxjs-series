import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DesignUtilityService } from './../../services/design-utility.service';

@Component({
  selector: 'app-async-subject',
  templateUrl: './async-subject.component.html',
  styleUrls: ['./async-subject.component.scss']
})
export class AsyncSubjectComponent implements OnInit {

  public _apiCallSubscription: Subscription[] = [];
  public showLastEmittedValue: any;

  constructor(private _designUtilityService: DesignUtilityService) { }

  ngOnInit() {
    const sub = this._designUtilityService.userAsyncEmit.subscribe(res => {
      this.showLastEmittedValue = res;
    });
    this._apiCallSubscription.push(sub);
  }

  /**
   * @param {*} value contains the value of input
   * @memberof ReplaySubjectComponent
   */
  public addUser(value): void {
    this._designUtilityService.userAsyncEmit.next(value);
  }

  /**
   * OnComplete Subscritption
   * @memberof ReplaySubjectComponent
   */
  public onComplete(): void {
    this._designUtilityService.userAsyncEmit.complete();
  }

  ngOnDestroy(): void {
    this._apiCallSubscription.forEach(x => x.unsubscribe());
  }

}
