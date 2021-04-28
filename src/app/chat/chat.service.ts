import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ChatMessage } from '../chat/chat-message.model';
import { User } from '../models/user.model';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    chatMessagesRef: AngularFireList<any>;
    chatMessages: Observable<any[]>;
    chatMessage: ChatMessage;
    user: User;

    constructor(private db: AngularFireDatabase, private firebaseService: FirebaseService, private authService: AuthService) {
        this.user = this.authService.getUser();

        this.chatMessagesRef = this.db.list('messages', (ref) => {
            return ref.limitToLast(25).orderByKey();
        });
    }

    sendMessage = (message: string) => {
        const timeStamp = this.getTimeStamp();
        this.chatMessagesRef.push({
            message: message,
            timeSent: timeStamp,
            displayName: this.user.displayName,
            email: this.user.email,
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

    getUsers() {
        const path = '/users';
        return this.db.list(path).valueChanges();
    }
}
