import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { ChatMessage } from "../../models/chat-message.model";
import firebase from 'firebase/app';

@Component({
    selector: "chat-message",
    templateUrl: "chat-message.component.html",
    styleUrls: ["chat-message.component.css"],
})
export class ChatMessageComponent implements OnInit {
    @Input() chatMessage: ChatMessage;

    displayName: string;
    messageContent: string;
    timeStamp: Date = new Date();
    isOwnMessage: boolean;
    uid: string;

    user: firebase.User;

    constructor(private authService: AuthService) {
        this.user = this.authService.getUser();
    }

    ngOnInit(chatMessage = this.chatMessage) {
        this.messageContent = chatMessage.message;
        this.timeStamp = chatMessage.timeSent;
        this.displayName = chatMessage.displayName;
        this.uid = chatMessage.uid;
    }
}
