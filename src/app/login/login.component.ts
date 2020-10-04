import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {

  }

  login():void{
    this.router.navigate(['/landing-page']);
  }

  async signInGoogle(): Promise<void> {
    var provider = new firebase.auth.GoogleAuthProvider();
    // this.router.navigate(['/register'])
    console.log("google");
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      //var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  signIn(): void {
    this.router.navigate(['/register']);
    console.log("sign in");
  }

}
