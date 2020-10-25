import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { DesignUtilityService } from './../../services/design-utility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public exclusive:boolean = false;
  public sub:Subscription;

  constructor(private _designUtilityService: DesignUtilityService) { }

  ngOnInit() {
    this.sub = this._designUtilityService.exclusive.subscribe(res => {
      this.exclusive = res;
    });
  }

  ngOnDestroy(): void {
     this.sub.unsubscribe();
  }

}
