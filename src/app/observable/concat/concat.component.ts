import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, concat } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DesignUtilityService } from './../../services/design-utility.service';

@Component({
  selector: 'app-concat',
  templateUrl: './concat.component.html',
  styleUrls: ['./concat.component.scss']
})
export class ConcatComponent implements OnInit, OnDestroy {

  public apiCallSubscription : Subscription[] = [];

  constructor(private _designUtilityService: DesignUtilityService) { }

  ngOnInit() {

    const techSource = interval(1000).pipe(map(v => 'Tech Video' + (v + 1)), take(5));
    const comedySource = interval(1000).pipe(map(v => 'Commedy Video' + (v + 1)), take(3));
    const NewsSource = interval(1000).pipe(map(v => 'News Video' + (v + 1)), take(4));

    // tslint:disable-next-line: deprecation
    const finalObs = concat(techSource, comedySource, NewsSource);
    const sub = finalObs.subscribe(res => {
       this._designUtilityService.appendElement(res, 'elContainer');
    });

    this.apiCallSubscription.push(sub);
  }

  ngOnDestroy(): void {
    this.apiCallSubscription.forEach(x => x.unsubscribe());
  }

}
