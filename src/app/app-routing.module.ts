import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Import Application Component
import { PromiseComponent } from './promise/promise.component';
import { AsyncAwaitComponent } from './async-await/async-await.component';
import { ObservableComponent } from './observable/observable.component';
import { ListComponent } from './observable/list/list.component';
import { FromEventComponent } from './observable/from-event/from-event.component';


const routes: Routes = [
  {path: 'promise' , component: PromiseComponent},
  {path: 'async-await', component: AsyncAwaitComponent},
  {path: 'observable', component: ObservableComponent, children:[
    {path: '', component: ListComponent},
    {path: 'from-event', component: FromEventComponent}
  ]},
  {path: '**' , redirectTo:'promise'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
