import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { AuthService } from '../shared/services/auth.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private httpClient: HttpClient, private auth: AuthService) {}
  buildHeaders() {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.auth.token, // continue to work here
    });
  }

  setHeader() {
    return { headers: this.buildHeaders() };
  }

  getEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(`${this.url}/events`, this.setHeader());
  }

  addEvent(event: Event): Observable<Event> {
    console.log(event);
    return this.httpClient.post<Event>(
      `${this.url}/events`,
      event,
      this.setHeader()
    );
  }

  deleteEvent(event: Event): Observable<any> {
    return this.httpClient.delete<any>(
      `${this.url}/event/${event.id}`,
      this.setHeader()
    );
  }

  updateEvent(event: Event): Observable<Event> {
    console.log('updating event');
    return this.httpClient.put<Event>(
      `${this.url}/event`,
      event,
      this.setHeader()
    );
  }
  getEvent(id: String): Observable<Event> {
    console.log('calling network');
    return this.httpClient.get<Event>(
      `${this.url}/event/${id}`,
      this.setHeader()
    );
  }
  likeEvent(event: Event): Observable<Event> {
    return this.httpClient.post<Event>(
      `${this.url}/event/like`,
      event,
      this.setHeader()
    );
  }

  adduser(user: User): Observable<User> {
    console.log("adding user in events file");
    console.log(user);
    return this.httpClient.post<User>(`${this.url}/user`, user);
  }

  private url: string = environment.url;
}
