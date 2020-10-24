import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, of, Subscription } from 'rxjs';
import { DesignUtilityService } from './../../services/design-utility.service';

@Component({
  selector: 'app-of-from',
  templateUrl: './of-from.component.html',
  styleUrls: ['./of-from.component.scss']
})
export class OfFromComponent implements OnInit, OnDestroy {

  public allSubscription: Subscription[] = [];

  public user = {
    'firstName': 'Saloni',
    'lastName': 'Malhotra',
    'profile': 'Developer'
  };
  public userArray = ['Saloni', 'Malhotra', 'Developer'];

  public showUser;

  constructor(private _designUtilityService: DesignUtilityService) { }

  ngOnInit() {

    // Ex-01 (Of)

    // Of - String
    const ofStringUser = of('Saloni', 'Malhotra', 'Developer');
    const ofStringUserSub = ofStringUser.subscribe(res => {
      this._designUtilityService.appendElement(res, 'elContainer');
    });

    // Of - Object
    const ofObjectUser = of(this.user);
    const ofObjectUserSub = ofObjectUser.subscribe(res => {
      this.showUser = res;
    });

     // Of - Array
     const ofArrayUser = of(this.userArray);
     const ofArrayUserSub = ofArrayUser.subscribe(res => {
       this._designUtilityService.appendElement(res, 'elContainerOfArray');
     });

    // Ex-02 (from)

    // from - Array : Converts into observable data of String
    const fromArray = from(this.userArray);
    const fromArrayUserSub = fromArray.subscribe(res => {
      this._designUtilityService.appendElement(res, 'elContainerArray');
    });

    // from - Promise : Converts Promise into observable data
    const fromPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve('Promise Resolved');
      }, 3000);
    });

    const fromPromiseSub = from(fromPromise).subscribe(
      (res) => {
        this._designUtilityService.appendElement(res, 'elContainerPromise');
      });

    // from - String : Converts String into observable data
    const fromString = from('Saloni ');
    const fromStringUserSub = fromString.subscribe(res => {
      this._designUtilityService.appendElement(res, 'elContainerString');
    });

    this.allSubscription.push(
      ofStringUserSub, ofObjectUserSub, ofArrayUserSub, fromArrayUserSub, fromPromiseSub, fromStringUserSub);
  }

  ngOnDestroy(): void {
    this.allSubscription.forEach(x => x.unsubscribe());
  }

}
