import { EventRouitngModule } from './event-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { EventListComponent } from './event-list.component';
import { EventFormComponent } from './event-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { EventinfoComponent } from './eventinfo.component';
@NgModule({
  declarations: [EventFormComponent, EventListComponent, EventinfoComponent],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    RouterModule,
    SharedModule,
    EventRouitngModule,
  ],
  exports: [EventListComponent],
})
export class EventsModule {}
