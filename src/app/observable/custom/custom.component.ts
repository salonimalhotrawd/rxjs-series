import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DesignUtilityService } from './../../services/design-utility.service';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit, OnDestroy {

  public techStatus;
  public apiCallSubscription: Subscription[] = [];
  constructor(private _designUtilityService: DesignUtilityService) { }

  ngOnInit() {

    // Ex-01 Manual
    const manualObs = Observable.create(Observer => {
      setTimeout(() => {
        Observer.next('Angular');
      }, 1000);

      setTimeout(() => {
        Observer.next('Typescript');
      }, 2000);

      setTimeout(() => {
        Observer.next('Html & CSS');
      }, 3000);

      setTimeout(() => {
        Observer.next('Javascript');
        //Observer.error(new Error('Limit Exceed'));
      }, 4000);

      setTimeout(() => {
        Observer.next('Jquery');
        Observer.complete();
      }, 5000);
    });

    const manualObsSub = manualObs.subscribe(res => {
      this._designUtilityService.appendElement(res, 'elManualContainer');
    }, (error) => {
      this.techStatus = 'error';
    }, () => {
      this.techStatus = 'Completed';
    });

    this.apiCallSubscription.push(manualObsSub);
  }

  ngOnDestroy(): void {
    this.apiCallSubscription.forEach(x => x.unsubscribe());
  }

}
