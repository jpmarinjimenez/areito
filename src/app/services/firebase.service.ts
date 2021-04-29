import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase/app';
import 'firebase/auth';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root',
})
export class FirebaseService {
    constructor(public db: AngularFireDatabase) {}

    setUserData(user: User, uid: string) {
        this.db
            .object('users/' + uid)
            .set(user)
            .catch((error) => console.log(error));
    }

    setUserOnline(uid: string) {
        this.db.object('users/' + uid).update({
            status: 'online'
        }).catch((error) => console.log(error));
    }

    setUserOffline(uid: string) {
        this.db.object('users/' + uid).update({
            status: 'offline'
        }).catch((error) => console.log(error));
    }

    getUserData() {
        var uid = firebase.auth().currentUser.uid;
        return this.db.object('users/' + uid).valueChanges();
    }
}