import { EventListComponent } from './events/event-list.component';
import { Event } from './models/event';
import { Component } from '@angular/core';

import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  sidebar = true;
  add = false;
  title = 'Bf events';
  events: Event[] = [];
  constructor(public authService: AuthService) {}
}
