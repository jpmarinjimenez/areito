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
                const user = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    status: 'online',
                };

                if (result.additionalUserInfo.isNewUser) {
                    this.firebaseService.setUserData(user, result.user.uid);
                }
                
                this.user.next(user);
                this.router.navigate(['/chat']);
            })
            .catch((error) => console.log(error));
    }

    // Logout
    logout() {
        this.user.next(null);
        return firebase.auth().signOut();
    }
}