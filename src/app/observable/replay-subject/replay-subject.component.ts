import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { DesignUtilityService } from './../../services/design-utility.service';

@Component({
  selector: 'app-replay-subject',
  templateUrl: './replay-subject.component.html',
  styleUrls: ['./replay-subject.component.scss']
})
export class ReplaySubjectComponent implements OnInit {

  @ViewChild('userName', {static: false}) public userName: ElementRef;

  public userList1 = [];
  public userList2 = [];
  public userList3 = [];

  public subscribeMode2: boolean = false;
  public subscribeMode3: boolean = false;

  public _apiCallSubscription: Subscription[] = [];
  public subscription2: Subscription;
  public subscription3: Subscription;
  public subscriptionToggle: Subscription;

  public methodInterval:boolean = false;

  constructor(private _designUtilityService: DesignUtilityService) { }

  ngOnInit() {

    const sub = this._designUtilityService.userEmit.subscribe(res => {
        this.userList1.push(res);
    });

    this._apiCallSubscription.push(sub);
  }

  /**
   * @param {*} value contains the value of input
   * @memberof ReplaySubjectComponent
   */
  public addUser(value): void {
    this._designUtilityService.userEmit.next(value);
  }

  /**
   * User 2 Subscribe Method
   * @memberof ReplaySubjectComponent
   */
  public user2Subscribe(): void {
     if (this.subscribeMode2) {
        this.subscription2.unsubscribe();
     } else {
      this.subscription2 = this._designUtilityService.userEmit.subscribe(res => {
        this.userList2.push(res);
      });
    }
    this.subscribeMode2 = !this.subscribeMode2;
  }

  /**
   * User 3 Subscribe Method
   * @memberof ReplaySubjectComponent
   */
  public user3Subscribe(): void {
    if (this.subscribeMode3) {
      this.subscription3.unsubscribe();
   } else {
     this.subscription3 = this._designUtilityService.userEmit.subscribe(res => {
      this.userList3.push(res);
     });
   }
   this.subscribeMode3 = !this.subscribeMode3;
  }

  /**
   *  Toggle Method
   * @memberof ReplaySubjectComponent
   */
  public toggleMethod(): void {
     const intervalUser = interval(1000);
     if (this.methodInterval) {
       this.subscriptionToggle.unsubscribe();
     } else {
      this.subscriptionToggle = intervalUser.subscribe(res => {
        this._designUtilityService.userEmit.next('User ' + res);
     });
     }
     this.methodInterval = !this.methodInterval;
  }

  ngOnDestroy(): void {
    this._apiCallSubscription.forEach(x => x.unsubscribe());
  }

}
