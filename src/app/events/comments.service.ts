import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { AuthService } from '../shared/services/auth.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private httpClient: HttpClient, private auth: AuthService) {}
  buildHeaders() {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.auth.token, // continue to work here
    });
  }

  setHeader() {
    return { headers: this.buildHeaders() };
  }

  addComment(event: Event): Observable<Event> {
    console.log(event);
    return this.httpClient.post<Event>(
      `${this.url}/events`,
      event,
      this.setHeader()
    );
  }

  deleteComment(event: Event): Observable<any> {
    return this.httpClient.delete<any>(
      `${this.url}/event/${event.id}`,
      this.setHeader()
    );
  }

  updateComment(event: Event): Observable<Event> {
    console.log('updating event');
    return this.httpClient.put<Event>(
      `${this.url}/event`,
      event,
      this.setHeader()
    );
  }

  getComments(id: String): Observable<Event> {
    console.log('calling network');
    return this.httpClient.get<Event>(
      `${this.url}/comments/${id}`,
      this.setHeader()
    );
  }

  private url: string = environment.url;
}
