import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesignUtilityService {

  public exclusive = new Subject<boolean>();
  public userName = new BehaviorSubject<string>('Saloni Malhotra');

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
