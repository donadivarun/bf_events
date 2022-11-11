import { EventinfoComponent } from './eventinfo.component';
import { EventListComponent } from './event-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: 'info/:id',
  component: EventinfoComponent
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRouitngModule { }
