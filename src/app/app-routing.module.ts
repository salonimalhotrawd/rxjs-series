import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Application Component
import { PromiseComponent } from './promise/promise.component';
import { AsyncAwaitComponent } from './async-await/async-await.component';
import { ObservableComponent } from './observable/observable.component';
import { ListComponent } from './observable/list/list.component';
import { FromEventComponent } from './observable/from-event/from-event.component';
import { IntervalComponent } from './observable/interval/interval.component';
import { OfFromComponent } from './observable/of-from/of-from.component';
import { ToArrayComponent } from './observable/to-array/to-array.component';
import { CustomComponent } from './observable/custom/custom.component';
import { MapComponent } from './observable/map/map.component';
import { PluckComponent } from './observable/pluck/pluck.component';
import { FilterComponent } from './observable/filter/filter.component';

const routes: Routes = [
  { path: 'promise', component: PromiseComponent },
  { path: 'async-await', component: AsyncAwaitComponent },
  {
    path: 'observable', component: ObservableComponent, children:
      [
        { path: '', component: ListComponent },
        { path: 'from-event', component: FromEventComponent },
        { path: 'interval-timer', component: IntervalComponent },
        { path: 'of-from', component: OfFromComponent },
        { path: 'toArray', component: ToArrayComponent },
        { path: 'custom', component: CustomComponent },
        { path: 'map', component: MapComponent },
        { path: 'pluck', component: PluckComponent },
        { path: 'filter', component: FilterComponent },
      ]
  },
  { path: '**', redirectTo: 'promise' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
