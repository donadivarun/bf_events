import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';

import { ProfileService } from './profile.service';
import { AuthService } from '../shared/services/auth.service';
import { environment } from 'src/environments/environment';

describe('ProfileService', () => {
  let service: ProfileService;
  let httpClient: HttpClient;
  let auth: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProfileService,
        {
          provide: HttpClient,
          useValue: jasmine.createSpyObj('HttpClient', ['get']),
        },
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['token']),
        },
      ],
    });
    service = TestBed.inject(ProfileService);
    httpClient = TestBed.inject(HttpClient);
    auth = TestBed.inject(AuthService);
    auth.token = 'test-token';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should build the headers with the authorization token', () => {
    const headers = service.buildHeaders();
    expect(headers.get('Authorization')).toEqual('Bearer test-token');
  });
});
