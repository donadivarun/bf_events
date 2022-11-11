import { EventListComponent } from './events/event-list.component';
import { Event } from './models/event';
import { Component } from '@angular/core';
import { EventService } from './events/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  add = false;
  title = 'Bf events';
  events: Event[] = [];
  constructor() {}
}
