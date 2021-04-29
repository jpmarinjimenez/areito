import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { FirebaseService } from '../services/firebase.service';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registerred?: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService implements OnDestroy {
    user = new BehaviorSubject<firebase.User>(null);
    provider = new firebase.auth.FacebookAuthProvider();

    constructor(private firebaseService: FirebaseService, private router: Router) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.handleAuthentication();
            }
        });
    }

    // Email
    register(form: any): void {
        firebase
            .auth()
            .createUserWithEmailAndPassword(form.email, form.password)
            .then(() => {
                console.log(form);
                this.handleAuthentication(form.displayName);
            })
            .catch((error) => console.log(error));
    }

    login(form: any): void {
        firebase
            .auth()
            .signInWithEmailAndPassword(form.email, form.password)
            .then(() => {
                this.handleAuthentication();
            })
            .catch((error) => console.log(error));
    }

    // Facebook
    facebookSignInPopup() {
        firebase
            .auth()
            .signInWithPopup(this.provider)
            .then(() => {
                this.handleAuthentication();
            })
            .catch((error) => console.log(error));
    }

    // Handle succesfull authentication
    handleAuthentication(displayName?: string) {
        const user = firebase.auth().currentUser;

        if (displayName) {
            // if login via email
            user.updateProfile({
                displayName: displayName,
            })
                .then(() => {
                    this.user.next(user);
                    this.router.navigate(['chat']);
                })
                .catch((error) => console.log(error));
        } else {
            // if login via Facebook
            this.user.next(user);
            this.router.navigate(['chat']);
        }

        const basicUser: User = {
            email: user.email,
            displayName: user.displayName,
            status: 'online',
        };

        this.firebaseService.setUserData(basicUser, user.uid);
    }

    // Get logged in user
    getUser() {
        const user = firebase.auth().currentUser;
        this.user.next(user);
        return user;
    }

    // Logout
    logout() {
        const user = firebase.auth().currentUser;
        this.firebaseService.setUserOffline(user.uid);

        this.user.next(null);
        return firebase.auth().signOut();
    }

    ngOnDestroy() {
        this.logout();
    }
}
