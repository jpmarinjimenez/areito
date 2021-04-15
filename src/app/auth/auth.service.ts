import { Injectable } from "@angular/core";
import firebase from "firebase/app";
import "firebase/auth";

interface User {
    isLoggedIn: boolean,
    accessToken?: string,
    email: string,
    displayName: string,
    photoURL?: string,       
}

@Injectable({
    providedIn: "root",
})
export class AuthService {
    provider = new firebase.auth.FacebookAuthProvider();

    user: User;

    constructor() {
        this.provider.addScope("email");
        this.provider.addScope("public_profile");
    }

    facebookSignInPopup() {
        firebase
            .auth()
            .signInWithPopup(this.provider)
            .then((result) => {
                const credential = result.credential as firebase.auth.OAuthCredential;

                this.user = {
                    isLoggedIn: true,
                    accessToken: credential.accessToken,
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL
                }

                console.log(this.user);
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
