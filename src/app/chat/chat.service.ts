import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import * as firebase from "firebase/app";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { ChatMessage } from "../chat/chat-message.model";

@Injectable({
    providedIn: "root",
})
export class ChatService {
    constructor(private authService: AuthService) {}

    sendMessage = (message: string) => {
        console.log(message);
    };
}
