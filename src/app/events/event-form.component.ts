import { Event } from './../models/event';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent implements OnInit {
  event: Event = new Event('', '', '', '', '', 0, new Date());
  @Input() editMode!: boolean;
  @Input() editableEvent!: Event;

  constructor() {}

  ngOnInit(): void {
    if (this.editMode == true) {
      this.event = this.editableEvent;
    }
  }
  add(): void {
    this.createEvent.emit(this.event);

    //this.event = new Event('', '', '', '', '', 0, new Date());
  }
  update(editableEvent: Event): void {
    this.event.id = editableEvent.id;
    this.createEvent.emit(this.event);
  }

  @Output()
  createEvent = new EventEmitter();
}
