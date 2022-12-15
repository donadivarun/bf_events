import { AuthService } from '../shared/services/auth.service';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let profileService: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [
        {
          provide: ProfileService,
          useValue: jasmine.createSpyObj('ProfileService', [
            'getLikedEvents',
            'getOwnEvents',
          ]),
        },
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', []),
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    profileService = TestBed.inject(ProfileService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call `getLikedEvents` and `getOwnEvents` on the `ProfileService` when `ngOnInit` is called', () => {
    component.ngOnInit();
    expect(profileService.getLikedEvents).toHaveBeenCalled();
    expect(profileService.getOwnEvents).toHaveBeenCalled();
  });
});
