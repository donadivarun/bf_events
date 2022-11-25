import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    console.log(user);
    //return user !== null && user.emailVerified !== false ? true : false;
    return user !== null ? true : false;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isLoggedIn !== true) {
      console.log('you must sign in first');
      //this.router.navigate(['login'])
    }
    return true;
  }
}
