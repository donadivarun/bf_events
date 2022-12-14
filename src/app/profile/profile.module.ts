import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EventRouitngModule } from '../events/event-routing.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    RouterModule,
    SharedModule,
    EventRouitngModule,
  ],
  exports: [ProfileComponent],
})
export class ProfileModule {}
