import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  status: boolean = false;
  events!: Event[];
  constructor() {}

  ngOnInit(): void {}
}
