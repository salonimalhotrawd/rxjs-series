import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-debouncetime',
  templateUrl: './debouncetime.component.html',
  styleUrls: ['./debouncetime.component.scss']
})
export class DebouncetimeComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('myInput', { static: false }) myInput: ElementRef;
  @ViewChild('myInput1', { static: false }) myInput1: ElementRef;

  public _apiCallSubscription: Subscription[] = [];
  public reqData: any = null;
  public reqData1: any = null;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

    // Ex-01 DebounceTime
    const source = fromEvent<any>(this.myInput.nativeElement, 'keyup').pipe(
      map(event => event.target.value),
      debounceTime(1000)
    );

    const sub = source.subscribe(res => {
      this.reqData = res;
    });

    // Ex-02 DistinctUntilChanged
    const source1 = fromEvent<any>(this.myInput1.nativeElement, 'keyup').pipe(
      map(event => event.target.value),
      debounceTime(1000),
      distinctUntilChanged()
    );

    const sub1 = source1.subscribe(res => {
      this.reqData1 = res;
    });

    this._apiCallSubscription.push(sub, sub1);
  }

  ngOnDestroy(): void {
    this._apiCallSubscription.forEach(x => x.unsubscribe());
  }

}
