import { Component, OnInit, Input } from '@angular/core';

import { catchError, of } from 'rxjs';
import { Event } from '../models/event';
import { EventService } from './event.service';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  add = true;

  userLiked = false;

  @Input()
  events!: Event[];
  errorMessage = '';
  UpdateBool = false;

  constructor(
    private eventService: EventService,
    public authService: AuthService
  ) {}

  showError(error: any): void {
    this.errorMessage = error.message
      ? error.message
      : error.status
      ? `${error.status} - ${error.statusText}`
      : 'Server error';
  }

  getEvents(): void {
    this.eventService
      .getEvents()
      .pipe(
        catchError((err) => {
          this.showError(err);
          return of([]);
        })
      )
      .subscribe((events) => (this.events = events));
  }
  addEvent(event: Event): void {
    this.eventService
      .addEvent(event)
      .pipe(
        catchError((err) => {
          this.showError(err);
          return of({});
        })
      )
      .subscribe(() => this.getEvents());
  }

  deleteEvent(event: Event): void {
    this.eventService
      .deleteEvent(event)
      .pipe(
        catchError((err) => {
          this.showError(err);
          return of({});
        })
      )
      .subscribe(() => this.getEvents());
  }

  setUpdateBool(bool: boolean): void {
    this.UpdateBool = bool;
  }
  updateEvent(event: Event): void {
    this.eventService
      .updateEvent(event)
      .pipe(
        catchError((err) => {
          this.showError(err);
          return of({});
        })
      )
      .subscribe(() => this.getEvents());
    location.reload();
  }
  likeEvent(event: Event): void {
    this.eventService
      .likeEvent(event)
      .pipe(
        catchError((err) => {
          this.showError(err);
          return of({});
        }),
        tap(() => this.toogleUserLikedEvent(event))
      )
      .subscribe(() => this.getEvents());
  }

  ngOnInit(): void {
    this.getEvents();
  }
  trackEvent(i: number, event: Event): string {
    return event.id;
  }
  
  toogleUserLikedEvent(event: Event) {
    if (event.isLiked === true) {
      this.userLiked = true;
    } else {
      this.userLiked = false;
    }
  }
}
