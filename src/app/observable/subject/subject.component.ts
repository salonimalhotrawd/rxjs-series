import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DesignUtilityService } from './../../services/design-utility.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit, OnDestroy {

  public apiCallSubscription: Subscription[] = [];
  public userName: String;

  constructor(private _designUtilityService: DesignUtilityService) {
     this.apiCallSubscription.push(this._designUtilityService.userName.subscribe(res => {
        this.userName = res;
     }));
   }

  ngOnInit() {
    this._designUtilityService.exclusive.next(true);
  }

  ngOnDestroy() {
    this._designUtilityService.exclusive.next(false);
    this._designUtilityService.userName.next('Saloni Malhotra');
    if (this.apiCallSubscription) {
      this.apiCallSubscription.forEach(x => x.unsubscribe);
    }
  }

}
