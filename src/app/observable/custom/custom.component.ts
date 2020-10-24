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
  public customtechStatus;
  public randomtechStatus;
  public showRandomName;

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
        Observer.complete();
      }, 4000);

      setTimeout(() => {
        Observer.next('Jquery');
      }, 5000);
    });

    const manualObsSub = manualObs.subscribe(res => {
      this._designUtilityService.appendElement(res, 'elManualContainer');
    }, (error) => {
      this.techStatus = 'error';
    }, () => {
      this.techStatus = 'Completed';
    });

    // Ex-02 Custom
    const techList = ['Angular', 'Typescript', 'Html & Css', 'Javascript', 'Jquery'];
    let count = 0;
    const customObs = Observable.create(Observer => {
      setInterval(() => {
        Observer.next(techList[count]);
        if (count === 3) {
          Observer.error(new Error('Unavailable Tech Stack'));
        }
        if (count === 4) {
          Observer.complete();
        }
        count++;
      }, 1000);
    });

    const customObsSub = customObs.subscribe(res => {
      this._designUtilityService.appendElement(res, 'elCustomContainer');
      }, (err) => {
          this.customtechStatus = 'error';
      }, () => {
        this.customtechStatus = 'Completed';
      });

    // Ex-03 Random Names
    const randomNames = ['Saloni', 'Anmol' , 'Sansha', 'Ronku'];
    let randomCount = 0;
    const randomNamesObs = Observable.create(observer => {
       setInterval(() => {
         observer.next(randomNames[randomCount]);
         if (count === 4) {
           observer.complete();
         }
         randomCount++;
       }, 1000);
    });

    const randomNamesObsSub = randomNamesObs.subscribe(res => {
        this.showRandomName = res;
    }, (error) => {
      this.randomtechStatus = 'error';
    }, () => {
      this.randomtechStatus = 'Completed';
    });

    this.apiCallSubscription.push(manualObsSub, customObsSub, randomNamesObsSub);
  }

  ngOnDestroy(): void {
    this.apiCallSubscription.forEach(x => x.unsubscribe());
  }

}
