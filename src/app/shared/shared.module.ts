import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoImagePipe } from './pipes/no-image.pipe';
import { FirstnamePipe } from './pipes/firstname.pipe';
import { LastnamePipe } from './pipes/lastname.pipe';
import { LocationPipe } from './pipes/location.pipe';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';

@NgModule({
  declarations: [
    NoImagePipe,
    FirstnamePipe,
    LastnamePipe,
    LocationPipe,
    DragAndDropDirective,
  ],
  imports: [CommonModule],
  exports: [NoImagePipe, DragAndDropDirective],
})
export class SharedModule {}
