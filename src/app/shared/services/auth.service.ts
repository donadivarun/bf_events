import { first, Observable } from 'rxjs';
//import { EventService } from './../../events/event.service';
import { Injectable, Injector, NgZone } from '@angular/core';
import { User } from 'src/app/models/user.model';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { EventService } from 'src/app/events/event.service';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  _token: string; // User token
  errorMessage = '';
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private injector: Injector
  ) {
    this._token = '';
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  get token() {
    if (this._token == '') {
      this._token = localStorage.getItem('userToken') || '';
    }
    return this._token;
  }
  set token(token) {
    localStorage.setItem('userToken', token);
    this._token = token;
  }

  showError(error: any): void {
    this.errorMessage = error.message
      ? error.message
      : error.status
      ? `${error.status} - ${error.statusText}`
      : 'Server error';
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result.user);
        result.user?.getIdToken().then((token) => (this.token = token));
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['dashboard']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string, fname: string, lname: string) {
    console.log(email);
    console.log(password);
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        result.user?.getIdToken().then((token) => (this.token = token));
        this.SendVerificationMail();
        //this.SetUserData(result.user);
        this.addUser(new User(false, email, fname, lname, result.user?.uid));
        console.log(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);

    // this.afAuth.user?.getIdToken().then((token) => (this._token = token));
    //return user !== null && user.emailVerified !== false ? true : false;
    return !!user;
  }

  // Send email verification when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  // Reset Forgot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Sign in with Google
  GoogleAuth() {
      return this.AuthLogin(new auth.GoogleAuthProvider()).then(() => {
        this.router.navigate(['dashboard']);
      });
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        result.user?.getIdToken().then((token) => (this.token = token));
        this.router.navigate(['dashboard']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  //TODO: Change variables

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const uName: String = user.displayName
    let fname = " ";
    let lname = '';
    if (uName) {
      fname = uName.split(" ")[0];
      lname = uName.split(" ")[1];
    }
    const userData: User = {
      username: user.uid,
      email: user.email,
      dark_mode: false,
      first_name: fname,
      last_name: lname,
      //emailVerified: user.emailVerified,
    };
    console.log(userData);
    this.addUser(userData);

    return userRef.set(userData, {
      merge: true,
    });
  }
  addUser(user: User): void {
    console.log(user)
    const eventService = this.injector.get<EventService>(EventService)
    eventService
      .adduser(user)
      .pipe(
        catchError((err) => {
          this.showError(err);
          return of({});
        })
      )
      .subscribe(() => eventService.getEvents());
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.userData = null;
      this.router.navigate(['login']);
    });
  }
  // get_auth(){
  //   this.afAuth.currentUser
  //
  //   if (firebase.auth().currentUser) {
  //
  //     this.afAuth.currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
  //       // Send token to your backend via HTTPS
  //       // ...
  //     }).catch(function (error) {
  //       // Handle error
  //     });
  //   }
  // }
}
