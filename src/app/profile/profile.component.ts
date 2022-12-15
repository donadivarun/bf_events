import { User } from 'src/app/models/user.model';
import { EventService } from 'src/app/events/event.service';
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
  user: User = new User(false, '', '', '', '');
  isowner!: boolean;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    public authService: AuthService,
    public eventService: EventService
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
  getUser(id: string): void {
    this.eventService
      .getuser(id)
      .pipe(
        catchError((err) => {
          this.showError(err);
          return of();
        })
      )
      .subscribe((user) => {this.user = user
        this.isowner = this.isOwner(id);
        console.log(this.isowner)
      console.log(this.user)});
  }
  isOwner(id: String): boolean {
    console.log("Checking owner")
    console.log(this.authService.userData.uid)
    console.log(id)
    return this.authService.userData.uid == id ? true : false;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id) {
      this.getUserEventsLiked(id);
      this.getUserEventsOwn(id);
      this.getUser(id);
    } else {
      this.getEventsLiked();
      this.getEventsOwn();
    }
  }
}
