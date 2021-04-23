import { Component, OnInit, Input } from "@angular/core";
import { ChatService } from "../chat.service";
import { AuthService } from "../../auth/auth.service";
import { ChatMessage } from "../../models/chat-message.model";

@Component({
    selector: "chat-message",
    templateUrl: "chat-message.component.html",
    styleUrls: ["chat-message.component.css"],
})
export class ChatMessageComponent implements OnInit {
    @Input() chatMessage: ChatMessage;
    userEmail: string;
    displayName: string;
    messageContent: string;
    timeStamp: Date = new Date();
    isOwnMessage: boolean;
    ownEmail: string;

    constructor(private authService: AuthService) {
        // authService.authUser().subscribe((user) => {
        //     this.ownEmail = user.email;
        //     this.isOwnMessage = this.ownEmail === this.userEmail;
        // });
    }

    ngOnInit(chatMessage = this.chatMessage) {
        this.messageContent = chatMessage.message;
        this.timeStamp = chatMessage.timeSent;
        this.userEmail = chatMessage.email;
        this.displayName = chatMessage.displayName;
    }
}
