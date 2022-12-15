import { AuthService } from './../shared/services/auth.service';
import { Comment } from './../models/comment.model';
import { EventListComponent } from './event-list.component';
import { EventFormComponent } from './../events/event-form.component';
import { Event } from '../models/event.model';
import { Descripton } from './../models/descripton.model';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../events/event.service';
import { catchError, Observable, of } from 'rxjs';
import { EventsModule } from '../events/events.module';
import { User } from '../models/user.model';

@Component({
  selector: 'app-eventinfo',
  templateUrl: './eventinfo.component.html',
  styleUrls: ['./eventinfo.component.css'],
  providers: [EventListComponent],
})
export class EventinfoComponent implements OnInit {
  edit = true;
  isowner!: boolean;
  id = '';
  @Input()
  event: Event = new Event('', '', '', '', '', 0, new Date(), false, '');
  comment: Comment = new Comment('', '', '', '', new Date(), '', '' );
  comments!: Comment[];
  user!: User;
  descriptons: Descripton[] = [
    {
      content: 'Better,cooler,Cats!',
      id: this.id,
    },
  ];
  errorMessage: string = '';
  UpdateBool: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private eventList: EventListComponent,
    private authService: AuthService
  ) {}

  showError(error: any): void {
    this.errorMessage = error.message
      ? error.message
      : error.status
      ? `${error.status} - ${error.statusText}`
      : 'Server error';
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
      this.getEvent();
      this.getComments();
    }
 
  }

  getComments(): void {
    this.eventService
      .getComments(this.id)
      .pipe(
        catchError((err) => {
          this.showError(err);
          return of();
        })
      )
      .subscribe((comments) => (this.comments = comments));
  }
  addComment(comment: Comment): void {
    comment.event_id = this.id;
    this.eventService
      .addComment(comment)
      .pipe(
        catchError((err) => {
          this.showError(err);
          return of();
        })
      )
      .subscribe((comment) => (this.comment = comment));
      location.reload();
      
  }
  getEvent(): void {
    this.eventService
      .getEvent(this.id)
      .pipe(
        catchError((err) => {
          this.showError(err);
          return of();
        })
      )
      .subscribe(event => {
        this.event = event;
        console.log(this.event);
        this.isowner = this.isOwner();

    });
  }
  getUser(uid: string): string {
    this.eventService
      .getuser(uid)
       .pipe(catchError(err => {
         this.showError(err);
         return of();
      }))
      .subscribe((user) => (this.user = user));
      return this.user.first_name;
  }
  deleteEvent(event: Event): void {
    alert('The event will be delted!');
    this.eventService
      .deleteEvent(event)
      .pipe(
        catchError((err) => {
          this.showError(err);
          return of({});
        })
      )
      .subscribe(() => this.eventList.getEvents());
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
      .subscribe(() => this.eventList.getEvents());
    location.reload();
  }
  isOwner(): boolean {
    return this.authService.userData.uid == this.event.user_id ? true : false;

  }
  trackComment(i: number, comment: Comment): string {
    return comment.comment_id;
  }
}
