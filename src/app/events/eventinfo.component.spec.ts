import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventinfoComponent } from './eventinfo.component';
import { Event } from '../models/event.model';
import { Comment } from '../models/comment.model';
import { Descripton } from '../models/descripton.model';
import { EventListComponent } from './event-list.component';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../events/event.service';

describe('EventinfoComponent', () => {
  let component: EventinfoComponent;
  let fixture: ComponentFixture<EventinfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventinfoComponent],
      providers: [
        EventListComponent,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
          },
        },
        EventService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventinfoComponent);
    component = fixture.componentInstance;
    component.event = new Event(
      'Test Event',
      'Test Description',
      'Test Location',
      'Test Category',
      'Test Organizer',
      0,
      new Date(),
      false
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
