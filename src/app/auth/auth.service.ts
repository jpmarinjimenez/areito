import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user = new BehaviorSubject<User>(null);
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
                this.user.next(user);
            })
            .catch((error) => console.log(error));
    }

    // Logout
    logout() {
        this.user.next(null);
        return firebase.auth().signOut();
    }
}
