import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    provider = new firebase.auth.FacebookAuthProvider();

    constructor(private firebaseService: FirebaseService) {}

    // Email
    login(email: string, password: string) {
        // return this.afAuth.auth.signInWithEmailAndPassword(email, password).then((user) => {
        //     this.authState = user;
        //     this.setUserStatus("online");
        //     this.router.navigate(["chat"]);
        // });
    }

    signUp(email: string, password: string, displayName: string) {
        // return this.afAuth.auth
        //     .createUserWithEmailAndPassword(email, password)
        //     .then((user) => {
        //         this.authState = user;
        //         const status = "online";
        //         this.setUserData(email, displayName, status);
        //     })
        //     .catch((error) => console.log(error));
    }

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
}
