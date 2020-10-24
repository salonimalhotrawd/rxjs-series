import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DesignUtilityService {
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
