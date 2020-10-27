import { Component, OnInit } from '@angular/core';
import { merge, interval, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.scss']
})
export class MergeComponent implements OnInit {

  public apiCallSubscription : Subscription[] = [];

  constructor(private _designUtilityService: DesignUtilityService) { }

  ngOnInit() {

    const techSource = interval(3000).pipe(map(v => 'Tech Video' + (v + 1)), take(5));
    const comedySource = interval(2000).pipe(map(v => 'Commedy Video' + (v + 1)), take(3));
    const NewsSource = interval(2500).pipe(map(v => 'News Video' + (v + 1)), take(4));

    const finalObs = merge(techSource, comedySource, NewsSource);
    const sub = finalObs.subscribe(res => {
       this._designUtilityService.appendElement(res, 'elContainer');
    });

    this.apiCallSubscription.push(sub);
  }

  ngOnDestroy(): void {
    this.apiCallSubscription.forEach(x => x.unsubscribe());
  }

}
