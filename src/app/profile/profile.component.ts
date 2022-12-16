import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../models/event.model';
import { AuthService } from '../shared/services/auth.service';
import { ProfileService } from './profile.service';
import { catchError, of } from 'rxjs';
import { NoImagePipe } from '../shared/pipes/no-image.pipe';
import { ActivatedRoute } from '@angular/router';
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
  id = '';
  errorMessage = '';
  num = 3;
  num2 = 1;

  constructor(
    private route: ActivatedRoute,
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

  getUserEventsLiked(id: string): void {
    this.profileService
      .getUserLikedEvents(id)
      .pipe(
        catchError((err) => {
          this.showError(err);
          return of([]);
        })
      )
      .subscribe((events) => (this.eventsLiked = events));
  }

  getUserEventsOwn(id: string): void {
    this.profileService
      .getUsersOwnEvents(id)
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
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id) {
      console.log('true');
      this.getUserEventsLiked(id);
      this.getUserEventsOwn(id);
    } else {
      console.log('false');
      this.getEventsLiked();
      this.getEventsOwn();
    }
  }
}
