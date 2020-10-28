import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-share-replay',
  templateUrl: './share-replay.component.html',
  styleUrls: ['./share-replay.component.scss']
})
export class ShareReplayComponent implements OnInit {

  public _apiCallSubscription: Subscription[] = [];

  public apiUrl = 'http://dummy.restapiexample.com/api/v1/employees';

  public allUsers: Observable<any>;
  public particularUser1: Observable<any>;
  public particularUser2: Observable<any>;

  constructor(public _http: HttpClient) { }

  ngOnInit() {

    this.allUsers = this._http.get('http://dummy.restapiexample.com/api/v1/employees').pipe(
      shareReplay()
    );

    this.particularUser1 = this.allUsers.pipe(map(res => res.data.filter(val => {
      return val.employee_salary === '86000';
    })
    ));

    this.particularUser2 = this.allUsers.pipe(map(res => res.data.filter(val => {
      return val.employee_salary === '320800';
    })
    ));
  }

}
