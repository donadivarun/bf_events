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
export class ProfileService {
  constructor(private httpClient: HttpClient, private auth: AuthService) {}

  
  buildHeaders() {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.auth.token, // continue to work here
    });
  }

  setHeader() {
    return { headers: this.buildHeaders() };
  }

  getEvent(id: String): Observable<Event> {
    console.log('calling network');
    return this.httpClient.get<Event>(
      `${this.url}/event/${id}`,
      this.setHeader()
    );
  }

  getOwnEvents(event: Event): Observable<Event> {
    return this.httpClient.put<Event>(
      `${this.url}/profile/created_events`,
      event,
      this.setHeader()
    );
  }

  getLikedEvents(event: Event): Observable<Event> {
    return this.httpClient.put<Event>(
      `${this.url}/profile/liked_events`,
      event,
      this.setHeader()
    );
  }

  private url: string = environment.url;
}
