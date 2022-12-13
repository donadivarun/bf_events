import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  getOwnEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(
      `${this.url}/profile/created_events`,
      this.setHeader()
    );
  }

  getLikedEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(
      `${this.url}/profile/liked_events`,
      this.setHeader()
    );
  }

  private url: string = environment.url;
}
