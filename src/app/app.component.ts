import { AuthGuard } from './shared/guard/auth.guard';
import { EventListComponent } from './events/event-list.component';
import { Event } from './models/event';
import { Component } from '@angular/core';

import { AuthService } from './shared/services/auth.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public authService: AuthService) {}
  sidebar = true;
  add = false;
  title = 'Bf events';
  events: Event[] = [];
}
