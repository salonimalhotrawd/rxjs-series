import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromiseComponent } from './promise/promise.component';
import { AsyncAwaitComponent } from './async-await/async-await.component';


const routes: Routes = [
  {path: 'promise' , component: PromiseComponent},
  {path: 'async-await', component: AsyncAwaitComponent},
  {path: '**' , redirectTo:'promise'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
