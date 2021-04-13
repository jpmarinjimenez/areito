import { Injectable } from "@angular/core";
import firebase from "firebase/app";
import "firebase/auth";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    provider = new firebase.auth.FacebookAuthProvider();
    
    constructor() {}

    facebookSignInPopup() {
        // [START auth_facebook_signin_popup]
        firebase
            .auth()
            .signInWithPopup(this.provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // The signed-in user info.
                var user = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                console.log(credential);
                // var accessToken = credential.accessToken;

                // ...
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
        // [END auth_facebook_signin_popup]
    }
}
