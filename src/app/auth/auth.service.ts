import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    provider = new firebase.auth.FacebookAuthProvider();

    constructor(private firebaseService: FirebaseService, private router: Router) {}

    // Facebook
    facebookSignInPopup() {
        firebase
            .auth()
            .signInWithPopup(this.provider)
            .then((result) => {
                // const credential = result.credential as firebase.auth.OAuthCredential;
                const user = {
                    email: result.user.email,
                    displayName: 'Prueba',
                    status: 'online',
                };

                this.firebaseService.getUserData().subscribe((userData) => {
                    if (!userData) {
                        this.firebaseService.setUserData(user, result.user.uid);
                    }
                });

                this.router.navigate(['/chat']);
            })
            .catch((error) => {
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

    // Logout
    logout() {
        return firebase.auth().signOut();
    }
}
