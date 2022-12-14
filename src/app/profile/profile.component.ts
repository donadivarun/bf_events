import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event';
//import { AuthService } from '../shared/services/auth.service';
import { ProfileService } from './profile.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  status: boolean = false;
  events!: Event[];
  constructor(private profileService: ProfileService) {}

  trackEvent(i: number, event: Event): string {
    return event.id;
  }
  ngOnInit(): void {}
}
