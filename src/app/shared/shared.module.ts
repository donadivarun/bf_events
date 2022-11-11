import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoImagePipe } from './pipes/no-image.pipe';
import { FirstnamePipe } from './pipes/firstname.pipe';
import { LastnamePipe } from './pipes/lastname.pipe';
import { LocationPipe } from './pipes/location.pipe';

@NgModule({
  declarations: [NoImagePipe, FirstnamePipe, LastnamePipe, LocationPipe],
  imports: [CommonModule],
  exports: [NoImagePipe],
})
export class SharedModule {}
