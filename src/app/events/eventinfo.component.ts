import { EventListComponent } from './event-list.component';
import { EventFormComponent } from './../events/event-form.component';
import { Event } from './../models/event';
import { Descripton } from './../models/descripton.model';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../events/event.service';
import { catchError, of } from 'rxjs';
import { EventsModule } from '../events/events.module';

@Component({
  selector: 'app-eventinfo',
  templateUrl: './eventinfo.component.html',
  styleUrls: ['./eventinfo.component.css'],
  providers: [EventListComponent],
})
export class EventinfoComponent implements OnInit {
  edit = true;
  id = '';
  @Input()
  event: Event = new Event('', '', '', '', '', 0, new Date(), false);
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
    private eventList: EventListComponent
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
      console.log('loaded ' + this.id);
    }
  }
  getEvent(): void {
    this.eventService
      .getEvent(this.id)
      // .pipe(catchError(err => {
      //   this.showError(err);
      //   return of();
      // }))
      .subscribe((event) => (this.event = event));
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
}
