import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesignUtilityService {

  public exclusive = new Subject<boolean>();
  public userName = new BehaviorSubject<string>('Saloni Malhotra');
  public userEmit = new ReplaySubject<string>(5, 2000);

  constructor() {}

  /**
  * @param {*} value contains the element to be append in the dom
  * @param {*} containerId contains the id in which section element has to be appended as child
  * @memberof DesignUtilityService
  */
  public appendElement(value, containerId): void {
    const el = document.createElement('li');
    el.innerText = value;
    document.getElementById(containerId).appendChild(el);
  }
}
