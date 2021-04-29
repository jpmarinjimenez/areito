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
                this.user.next(user);
            } else {
                this.user.next(null);
            }
        });
    }

    // Email
    register(form: any): void {
        firebase
            .auth()
            .createUserWithEmailAndPassword(form.email, form.password)
            .then(() => {
                this.handleAuthenticationEmail(form.displayName);
                this.router.navigate(['chat']);
            })
            .catch((error) => console.log(error));
    }

    login(form: any): void {
        firebase
            .auth()
            .signInWithEmailAndPassword(form.email, form.password)
            .then(() => {
                this.handleAuthenticationEmail();
                this.router.navigate(['chat']);
            })
            .catch((error) => console.log(error));
    }

    // Facebook
    facebookSignInPopup() {
        firebase
            .auth()
            .signInWithPopup(this.provider)
            .then((response) => {
                this.handleAuthenticationFacebook(response);
                this.router.navigate(['chat']);
            })
            .catch((error) => console.log(error));
    }

    // Handle succesfull authentication
    async handleAuthenticationEmail(displayName?: string) {
        const user = firebase.auth().currentUser;

        if (displayName) {
            await user.updateProfile({
                displayName: displayName,
            }).catch((error) => console.log(error));
        }

        this.user.next(user);
    }

    async handleAuthenticationFacebook(response: firebase.auth.UserCredential) {
        const user = firebase.auth().currentUser;

        if (response.additionalUserInfo.isNewUser) {
            const basicUser: User = {
                email: user.email,
                displayName: user.displayName,
                status: 'online',
            };

            await this.firebaseService.setUserData(basicUser, user.uid);
        }

        this.user.next(user);
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
