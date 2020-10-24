import { DesignUtilityService } from './../../services/design-utility.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit,OnDestroy {

  public apiCallSubscription: Subscription[] = [];
  public userListSub;
  public userListMapSub;
  public userObjSub;

  constructor(private _designUtilityService: DesignUtilityService) { }

  ngOnInit() {

    const userList = interval(1000);

    // Ex- 01
    this.userListSub = userList.pipe(
      map(data => 'User ' + data)
    ).subscribe(res => {
      this._designUtilityService.appendElement(res, 'elContainer');
    });

    setTimeout(() => {
      this.userListSub.unsubscribe();
    }, 10000);

    // Ex- 02
    this.userListMapSub = userList.pipe(
      map(data => data * 3)
    ).subscribe(res => {
      this._designUtilityService.appendElement(res, 'elContainerMap');
    });

    setTimeout(() => {
      this.userListMapSub.unsubscribe();
    }, 10000);

    // Ex- 03
    const members = [
      { id: 1, name: 'Saloni Malhotra'},
      { id: 2, name: 'Anmol Dogra'},
      { id: 3, name: 'Ronku'},
      { id: 4, name: 'Raghav Kumar'},
      { id: 5, name: 'Diksha Bakshi'},
      { id: 6, name: 'Neha Sharma'},
      { id: 7, name: 'Shweta Srivastav'},
      { id: 8, name: 'Abhinav Sharma'},
      { id: 9, name: 'Kartik Malhotra'},
      { id: 10, name: 'Pallavi Prashar'}
    ];

    this.userObjSub = from(members).pipe(
      map(data => data.name)
    ).subscribe(res => {
       this._designUtilityService.appendElement(res, 'elContainerObjectData');
    });

    this.apiCallSubscription.push(this.userListSub, this.userListMapSub, this.userObjSub);
  }

  ngOnDestroy() {
    this.apiCallSubscription.forEach(x => x.unsubscribe());
  }

}
