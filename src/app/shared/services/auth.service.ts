import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { BehaviorSubject } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser;

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor( 
    private firestore: AngularFirestore,   
    private fireauth: AngularFireAuth, 
    private alertService: AlertService,
    private router: Router
  ) {

    this.authStateListener();

   }


  SignUp(username, email, password) {
    return this.fireauth.createUserWithEmailAndPassword(email, password)
      .then((result) => {

        result.user.updateProfile({
          displayName: username
        });

        const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`users/${result.user.uid}`);

         userRef.set( {
          uid: result.user.uid,
          email: email,
          username: username
        }, 
        {
          merge: true
        })

        

        //this.SignIn(email, password);
        this.router.navigate(['/user/home']);

      }).catch((error) => {
       console.log(error.message);
       this.alertService.alertMessage('error', error.code, error.message);
      })
  }

  SignIn(email, password) {
    return this.fireauth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        
          this.router.navigate(['/user/home']);

      }).catch((error) => {
        this.alertService.alertMessage('error', error.code, error.message);
      })
  }

  signOut(){
    this.fireauth.signOut().then(()=>{
      this.router.navigate(['/login'])
    });
  }

  authStateListener(){
    this.fireauth.onAuthStateChanged((user)=>{
      if(user){
        this.currentUser=user;
        this._isLoggedIn$.next(true);
      }
      else{
        this._isLoggedIn$.next(false);
        this.router.navigate['/login'];
      }
    })
  }

  getCurrentUser(){
    return this.currentUser;
  }



  isLoggedIn() {
    return this.isLoggedIn$;
  }
}
