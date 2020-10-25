import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subscription } from 'rxjs';
import { delay, retry, retryWhen, scan } from 'rxjs/operators';

@Component({
  selector: 'app-retry',
  templateUrl: './retry.component.html',
  styleUrls: ['./retry.component.scss']
})
export class RetryComponent implements OnInit {

  public apiCallSubscription: Subscription[] = [];
  public fetching: boolean = false;
  public status = 'No Data';
  public fetchData = [];

  constructor(public _http: HttpClient) { }

  ngOnInit() {
  }

  /**
   * Fetch Detail API
   * @memberof RetryComponent
   */
  public fetchDetails(): void {
    this.fetching = true;
    let count = 0;
    this._http.get('http://dummy.restapiexample.com/api/v1/employees').pipe(
      //retry(5)
      retryWhen(err => err.pipe(
        delay(3000), scan((retryCount) => {
          if (count === 6) {
            throw err;
          } else {
            count = count + 1;
          }
        })
      ))
    ).subscribe(res => {
      if (res['status'] === 'success') {
        this.fetching = false;
        this.status = res['status'];
        this.fetchData = res['data'];
      }
    }, (err) => {
      this.fetching = false;
      this.status = 'Problem Fetching Data';
      console.log(err, 'err');
    });
  }

}
