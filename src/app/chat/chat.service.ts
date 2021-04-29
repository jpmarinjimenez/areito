import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ChatMessage } from '../chat/chat-message.model';
import firebase from 'firebase/app';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
    providedIn: 'root',
})
export class ChatService implements OnDestroy {
    chatMessagesRef: AngularFireList<any>;
    chatMessages: Observable<any[]>;
    chatMessage: ChatMessage;
    user: any;
    userSuscription;

    constructor(private db: AngularFireDatabase, private authService: AuthService, private firebaseService: FirebaseService) {
        this.userSuscription = this.firebaseService.getUserData().subscribe(user => {
            this.user = user;
        })

        this.chatMessagesRef = this.db.list('messages', (ref) => {
            return ref.limitToLast(25).orderByKey();
        });
    }

    ngOnDestroy() {
        this.userSuscription.unsubscribe();
    }

    sendMessage = (message: string) => {
        const timeStamp = this.getTimeStamp();
        this.chatMessagesRef.push({
            message: message,
            timeSent: timeStamp,
            displayName: this.user.displayName,
            email: this.user.email,
            uid: firebase.auth().currentUser.uid,
        });
    };

    getMessages(): Observable<any[]> {
        return this.chatMessagesRef.valueChanges();
    }

    getTimeStamp = () => {
        const now = new Date();
        const date = now.getUTCFullYear() + '/' + (now.getUTCMonth() + 1) + '/' + now.getUTCDate();
        const time = now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds();

        return date + ' ' + time;
    };

    getUsers(): Observable<unknown[]> {
        const path = '/users';
        return this.db.list(path).valueChanges();
    }
}
