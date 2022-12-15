import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalenderComponent } from './calender/calender.component';
import { EventListComponent } from './events/event-list.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: EventListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'calender',
    component: CalenderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: '**',
    component: EventListComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
