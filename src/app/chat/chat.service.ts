import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import * as firebase from "firebase/app";
import { Observable } from "rxjs";
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

    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
        this.afAuth.authState.subscribe((auth) => {
            if (auth !== undefined && auth !== null) {
                this.user = auth;
            }
        });

        this.chatMessagesRef = this.db.list("messages", (ref) => {
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
            // username: this.user.username,
            email: this.user.email,
        });

        console.log("Message pushed!");
    };

    getMessages(): Observable<any[]> {
        return this.chatMessagesRef.valueChanges();
    }

    getTimeStamp = () => {
        const now = new Date();
        const date = now.getUTCFullYear() + "/" + (now.getUTCMonth() + 1) + "/" + now.getUTCDate();
        const time = now.getUTCHours() + ":" + now.getUTCMinutes() + ":" + now.getUTCSeconds();

        return date + " " + time;
    };
}
