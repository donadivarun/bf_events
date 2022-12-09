import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Event } from './../models/event';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent implements OnInit {
  event: Event = new Event('', '', '', '', '', 0, new Date());
  image: string = '';

  @Input() editMode!: boolean;
  @Input() editableEvent!: Event;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.editMode == true) {
      this.event = this.editableEvent;
    }
  }
  add(): void {
    this.event.image = this.image;
    this.createEvent.emit(this.event);
  }
  update(editableEvent: Event): void {
    this.event.id = editableEvent.id;
    this.createEvent.emit(this.event);
  }

  onDrop(e: any) {
    // step 1: alias the component this to a variable comp
    let comp = this;
    let size: number = 160;
    let oldHeight: number;
    let oldWidth: number;
    let newHeight: number;
    let newWidth: number;
    let files = e.target.files || e.dataTransfer.files;
    if (files && files.length > 0) {
      let f = files[0];
      let reader = new FileReader();
      reader.onload = (function (f) {
        return function (e2: any) {
          let picture: HTMLImageElement = new Image();
          picture.onload = function () {
            oldHeight = (<HTMLImageElement>this).height;
            oldWidth = (<HTMLImageElement>this).width;
            newHeight = oldHeight;
            newWidth = oldWidth;
            if (oldHeight > size) {
              newHeight = size;
              newWidth = (newHeight * oldWidth) / oldHeight;
            }
            if (newWidth > size) {
              let oldWidth = newWidth;
              newWidth = size;
              newHeight = (newWidth * newHeight) / oldWidth;
            }
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            canvas.width = newWidth;
            canvas.height = newHeight;

            ctx?.drawImage(picture, 0, 0, newWidth, newHeight);
            // step 2:  retrieve a base64 encoded version of the image
            // and assign it to the component's cover property
            comp.image = canvas.toDataURL(f.type);
            console.log('img' + comp.image);
          };
          picture.src = e2.target.result;
        };
      })(f);
      reader.readAsDataURL(f);
    }
  }
  @Output()
  createEvent = new EventEmitter();
}
