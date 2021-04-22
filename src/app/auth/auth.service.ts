import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    provider = new firebase.auth.FacebookAuthProvider();

    constructor() {}

    // Facebook
    facebookSignInPopup() {
        return firebase.auth().signInWithPopup(this.provider);
    }

    // Logout
    logout() {
        return firebase.auth().signOut();
    }
}
