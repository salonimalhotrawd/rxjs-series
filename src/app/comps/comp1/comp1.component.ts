import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DesignUtilityService } from './../../services/design-utility.service';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.scss']
})
export class Comp1Component implements OnInit, OnDestroy {

  public userName;
  public sub:Subscription;
  constructor(private _designUtilityService: DesignUtilityService) { }

  ngOnInit() {
    this.sub = this._designUtilityService.userName.subscribe(res => {
       this.userName = res;
    });
  }

  public changeName(uname) {
    this._designUtilityService.userName.next(uname.value);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
