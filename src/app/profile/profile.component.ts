import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../models/event';
import { AuthService } from '../shared/services/auth.service';
import { ProfileService } from './profile.service';
import { catchError, of } from 'rxjs';
import { NoImagePipe } from '../shared/pipes/no-image.pipe';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  status: boolean = false;

  @Input()
  eventsLiked!: Event[];
  eventsOwn!: Event[];
  errorMessage = '';

  constructor(
    private profileService: ProfileService,
    public authService: AuthService
  ) {}

  getEventsLiked(): void {
    this.profileService
      .getLikedEvents()
      .pipe(
        catchError((err) => {
          this.showError(err);
          return of([]);
        })
      )
      .subscribe((events) => (this.eventsLiked = events));
  }

  getEventsOwn(): void {
    this.profileService
      .getOwnEvents()
      .pipe(
        catchError((err) => {
          this.showError(err);
          return of([]);
        })
      )
      .subscribe((events) => (this.eventsOwn = events));
  }
  showError(error: any): void {
    this.errorMessage = error.message
      ? error.message
      : error.status
      ? `${error.status} - ${error.statusText}`
      : 'Server error';
  }

  trackEvent(i: number, event: Event): string {
    return event.id;
  }
  ngOnInit(): void {
    this.getEventsLiked();
    this.getEventsOwn();
  }
}
