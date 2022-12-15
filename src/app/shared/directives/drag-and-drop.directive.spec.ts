import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';

import { DragAndDropDirective } from './drag-and-drop.directive';

describe('DragAndDropDirective', () => {
  let directive: DragAndDropDirective;
  let el: ElementRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DragAndDropDirective],
    });
    el = jasmine.createSpyObj('ElementRef', ['nativeElement']);
    directive = new DragAndDropDirective(el);
  });

  it('should create the directive', () => {
    expect(directive).toBeTruthy();
  });

  it('should set the element style to `border: 1px solid blacbor` when `dragover` is triggered', () => {
    const event = new DragEvent('dragover');
    directive.onDragOver(event);
    expect(el.nativeElement.style).toEqual;
  });
});
