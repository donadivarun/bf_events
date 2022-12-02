import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import {AuthService} from "../shared/services/auth.service";

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private httpClient: HttpClient, private auth: AuthService) {}
  buildHeaders(){
    this.auth.Token();  // continue to work here
  }
  getEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(`${this.url}/events`);
  }

  addEvent(event: Event): Observable<Event> {
    return this.httpClient.post<Event>(`${this.url}/events`, event);
  }

  deleteEvent(event: Event): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}/event/${event.id}`);
  }

  updateEvent(event: Event): Observable<Event> {
    console.log('updating event');
    return this.httpClient.put<Event>(`${this.url}/event`, event);
  }
  getEvent(id: String): Observable<Event> {
    console.log('calling network');
    return this.httpClient.get<Event>(`${this.url}/event/${id}`);
  }
  likeEvent(event: Event): Observable<Event> {
    return this.httpClient.post<Event>(`${this.url}/event/like`, event);
  }

  adduser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.url}/user`, user);
  }

  private url: string = environment.url;
}
