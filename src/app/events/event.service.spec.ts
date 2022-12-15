import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';

import { EventService } from './event.service';
import { AuthService } from '../shared/services/auth.service';
import { environment } from 'src/environments/environment';

describe('EventService', () => {
  let service: EventService;
  let httpClient: HttpClient;
  let auth: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventService,
        {
          provide: HttpClient,
          useValue: jasmine.createSpyObj('HttpClient', [
            'get',
            'post',
            'put',
            'delete',
          ]),
        },
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['token']),
        },
      ],
    });
    service = TestBed.inject(EventService);
    httpClient = TestBed.inject(HttpClient);
    auth = TestBed.inject(AuthService);
    auth.token = 'test-token';
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
