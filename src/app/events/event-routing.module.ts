import { ProfileComponent } from './../profile/profile.component';
import { EventinfoComponent } from './eventinfo.component';
import { EventListComponent } from './event-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'info/:id',
    component: EventinfoComponent,
  },
];

const route: Routes = [
  {
    path: 'profile/:id',
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRouitngModule {}
