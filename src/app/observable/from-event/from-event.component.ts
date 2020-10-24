import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { DesignUtilityService } from './../../services/design-utility.service';

@Component({
  selector: 'app-from-event',
  templateUrl: './from-event.component.html',
  styleUrls: ['./from-event.component.scss']
})
export class FromEventComponent implements OnInit, AfterViewInit {

  @ViewChild('addBtn', {static: false}) public addBtn: ElementRef;
  constructor(private _designUtilityService: DesignUtilityService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
      let count = 1;
      fromEvent(this.addBtn.nativeElement, 'click').subscribe(res => {
        const userList = 'User-' + count++;
        this._designUtilityService.appendElement(userList, 'elContainer');
        this._designUtilityService.appendElement(userList, 'elContainer2');
      });
  }

 }
