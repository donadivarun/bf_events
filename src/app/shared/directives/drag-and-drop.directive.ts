import {
  Directive,
  HostListener,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]',
})
export class DragAndDropDirective {
  constructor(private el: ElementRef) {}

  @Output() onDropped: EventEmitter<any> = new EventEmitter();

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    this.el.nativeElement.style = 'border: 1px solid blacbor';
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    event.preventDefault();
    this.el.nativeElement.style = 'border: none';
    this.onDropped.emit(event);
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.el.nativeElement.style = 'border: none';
  }
}
