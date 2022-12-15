import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Event } from '../models/event.model';
import { EventFormComponent } from './event-form.component';

describe('EventFormComponent', () => {
  let component: EventFormComponent;
  let fixture: ComponentFixture<EventFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit the correct event object when add() is called', () => {
    // Set up the test
    let expectedEvent = new Event(
      'test',
      'test',
      'test',
      'test',
      'test',
      0,
      new Date(),
      false
    );
    let emittedEvent;

    // Subscribe to the createEvent event emitter
    component.createEvent.subscribe((event) => (emittedEvent = event));

    // Set the event property on the component
    component.event = expectedEvent;

    // Call the add() method
    component.add();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
