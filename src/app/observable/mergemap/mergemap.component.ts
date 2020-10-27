import { Component, OnInit, OnDestroy } from '@angular/core';
import { from, Observable, of, Subscription } from 'rxjs';
import { map, mergeAll, mergeMap } from 'rxjs/operators';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-mergemap',
  templateUrl: './mergemap.component.html',
  styleUrls: ['./mergemap.component.scss']
})
export class MergemapComponent implements OnInit, OnDestroy {

  public apiCallSubscription: Subscription[] = [];

  constructor(private _designUtilityService: DesignUtilityService) { }

  ngOnInit() {
    const source = from(['Tech', 'News', 'Comedy']);

    // Ex - 01 | Map
    const subMap = source.pipe(map(res => this.getdummyAPIData(res))).subscribe(val => {
      this._designUtilityService.appendElement(val, 'elContainer');
    });


    // Ex - 02 | Map + MergeAll
    const subMapAndMergeAll = source.pipe(map(res => this.getdummyAPIData(res)), mergeAll()).subscribe(val => {
      this._designUtilityService.appendElement(val, 'elContainer2');
    });


    // Ex - 03 | Mergemap
    const subMergeMap = source.pipe(mergeMap(res => this.getdummyAPIData(res))).subscribe(val => {
      this._designUtilityService.appendElement(val, 'elContainer3');
    });

    this.apiCallSubscription.push(subMap, subMapAndMergeAll, subMergeMap);
  }

  public getdummyAPIData(data) {
    return of(data + ' Video Uploaded');
  }

  ngOnDestroy(): void {
    this.apiCallSubscription.forEach(x => x.unsubscribe());
  }

}
