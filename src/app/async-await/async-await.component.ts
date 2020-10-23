import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-async-await',
  templateUrl: './async-await.component.html',
  styleUrls: ['./async-await.component.scss']
})
export class AsyncAwaitComponent implements OnInit {

  public showPromise:boolean = false;
  public showAsyncAwait:boolean = false;
  public showFetchData:boolean = false;
  public hideAll:boolean = false;

  public fetchPromiseUser;
  public fetchAPIUser;
  public fetchData:any[] = [];

  public showPromiseUser = {
    'id' : 1,
    'title' : 'Promise',
    'body' : 'Fetch Data by using Promise'
  }

  public showAsyncAwaitUser = {
    'id' : 1,
    'title' : 'async/await',
    'body' : 'Fetch Data by using async/await'
  }

 constructor() {}

  ngOnInit() {
  }

  //Initialize Fetch Data
  public initializeFetchData() {
    if(this.showPromise || this.showAsyncAwait) {
      this.fetchPromiseUser = new Promise((resolve,reject) => {
        setTimeout(() => {
          let res = this.showPromise ? this.showPromiseUser : this.showAsyncAwaitUser;
          resolve(res);
        },3000)
     });
   }else {
     this.fetchAPIUser = fetch('https://jsonplaceholder.typicode.com/users/1/posts').then((response) => response.json())
   }
  }

  //Ex:01 - With Promise
  public fetchPromise() {
    this.fetchData = [];
    this.toggle('showPromise');
    this.initializeFetchData();
    this.fetchPromiseUser.then(res => {
      this.fetchData = [res];
      this.toggle();
    }).catch(err => { console.log('++++ Error +++', err) });
  }

  //Ex:02 - With Async/Await
  public async fetchAsyncAwait() {
    this.fetchData = [];
    this.toggle('showAsyncAwait');
    this.initializeFetchData();
    let res = await this.fetchPromiseUser;
    this.fetchData = [res];
    this.toggle();
  }

  //Ex:03 - With Fetch API - By Using Promise
  public fetchDatabyAPI1() {
    this.fetchData = [];
    this.toggle('showFetchData');
    this.initializeFetchData();

    this.fetchAPIUser.then(res => {
      this.fetchData = res;
      this.toggle();
    })
  }

  //Ex:03 - With Fetch API - By Using async/await
  public async fetchDatabyAPI() {
    this.fetchData = [];
    this.initializeFetchData();
    this.fetchData = await this.fetchAPIUser;
    this.toggle();
  }

  /**
   * @param val value contains to toggle value of Promise,async or fetch API Section
   */
  public toggle(val?) {
    if(val == 'showPromise') {
      this.showPromise = true;
      this.showAsyncAwait = false;
      this.showFetchData = false;
      this.hideAll = false;
    }
    else if(val == 'showAsyncAwait') {
      this.showPromise = false;
      this.showAsyncAwait = true;
      this.showFetchData = false;
      this.hideAll = false;
    }
    else if(val == 'showFetchData') {
      this.showPromise = false;
      this.showAsyncAwait = false;
      this.showFetchData = true;
      this.hideAll = false;
    }
    else {
      this.hideAll = true;
    }
  }

}
