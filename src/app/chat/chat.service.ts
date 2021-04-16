import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import * as firebase from "firebase/app";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { ChatMessage } from "../chat/chat-message.model";
import { User } from "../models/user.model";

@Injectable({
    providedIn: "root",
})
export class ChatService {
    chatMessagesRef: AngularFireList<any>;
    chatMessages: Observable<any[]>;
    chatMessage: ChatMessage;
    user: User;

    constructor(private authService: AuthService, private db: AngularFireDatabase) {
        // if (authService.user.isLoggedIn) {
        //     this.user = authService.user;
        // }

        this.chatMessagesRef = this.db.list("messages", ref => {
            return ref.limitToLast(25).orderByKey();
        });
    }

    sendMessage = (message: string) => {
        const timeStamp = this.getTimeStamp();
        const email = this.user.email;
        this.chatMessages = this.chatMessagesRef.valueChanges();
        this.chatMessagesRef.push({
            message: message,
            timeSent: timeStamp,
            displayName: this.user.displayName,
            email: this.user.email,
        });

        console.log('Message pushed!');
    };

    getTimeStamp = () => {
        const now = new Date();
        const date = now.getUTCFullYear() + "/" + (now.getUTCMonth() + 1) + "/" + now.getUTCDate();
        const time = now.getUTCHours() + ":" + now.getUTCMinutes() + ":" + now.getUTCSeconds();

        return date + " " + time;
    };
}
