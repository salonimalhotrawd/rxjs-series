import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';
import { DesignUtilityService } from './../../services/design-utility.service';

@Component({
  selector: 'app-tap',
  templateUrl: './tap.component.html',
  styleUrls: ['./tap.component.scss']
})
export class TapComponent implements OnInit, OnDestroy {

  public myColor: String = '';
  public apiCallSubscription: Subscription[] = [];

  constructor(private _designUtilityService: DesignUtilityService) { }

  ngOnInit() {

    const source = interval(1000);

    // Ex-01
    const userList = ['Saloni Malhotra', 'Anmol Dogra', 'Kartik', 'Sansha Malhotra', 'Ronku'];
    const sub = source.pipe(
      tap(data => {
        if (data === 5) { sub.unsubscribe(); }
      }), map(data => userList[data])
    ).subscribe(res => {
      this._designUtilityService.appendElement(res, 'elContainer');
    });

    // Ex-02
    const colorList = ['Red', 'Green', 'Marron' , 'Purple', 'yellow' , 'Pink', 'Aqua', 'Neon'];
    const sub1 = source.pipe(
      tap(data => {
        this.myColor = colorList[data];
        if (data === 8) { sub1.unsubscribe(); }
      }), map(data => colorList[data])
    ).subscribe(res => {
      this._designUtilityService.appendElement(res, 'elContainer2');
    });

    this.apiCallSubscription.push(sub, sub1);
  }

  ngOnDestroy(): void {
    this.apiCallSubscription.forEach(x => x.unsubscribe());
  }

}
