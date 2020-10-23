import { Component, OnInit } from '@angular/core';
import { resolve } from 'url';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styleUrls: ['./promise.component.scss']
})
export class PromiseComponent implements OnInit {

  public dellAvailable = {
    'brand' : 'Dell',
    'color' : 'Silver',
    'price' : '78000',
    'status' : 'Success'
  }

  public hpAvailable = {
    'brand' : 'HP',
    'color' : 'Black',
    'price' : '56000',
    'status' : 'Success'
  }

  public notAvailable = {
    'brand' : 'Not Available',
    'color' : 'Not Available',
    'price' : 'Not Available',
    'status' : 'Failed'
  }

  public showBrand:Object;
  constructor() { }

  ngOnInit() {
  }

  public isDellAvailable():boolean {
    return true;
  }

  public isHpAvailable():boolean{
    return false;
  }

  public brandAvailable() {
    const buyLaptop = new Promise((resolve, reject) => {
      if(this.isDellAvailable) {
        resolve(this.dellAvailable);
        /* To call after some interval of time */
        // setTimeout(() => {
        //    resolve(this.dellAvailable);
        // },3000)
      }else if(this.isHpAvailable){
        resolve(this.isHpAvailable);
      /* To call after some interval of time */
      //  setTimeout(() => {
      //     resolve(this.isHpAvailable);
      //  },3000)
      }else {
        reject(this.notAvailable);
      /* To call after some interval of time */
      //  setTimeout(() => {
      //     reject(this.notAvailable);
      //  },3000)
      }
   });

   buyLaptop.then(res => {
     this.showBrand = res;
     console.log(res, '<= then Code');
   }).catch(err => {
     this.showBrand = err;
     console.log(err, '<= Catch Code');
   });
  }

}
