import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from '../../models/chat-message.model';
import firebase from 'firebase/app';

@Component({
    selector: 'chat-message',
    templateUrl: 'chat-message.component.html',
    styleUrls: ['chat-message.component.css'],
})
export class ChatMessageComponent implements OnInit {
    @Input() chatMessage: ChatMessage;

    displayName: string;
    messageContent: string;
    timeStamp: Date = new Date();
    isOwnMessage: boolean;
    uid: string;

    constructor() {}

    ngOnInit(chatMessage = this.chatMessage) {
        this.messageContent = chatMessage.message;
        this.timeStamp = chatMessage.timeSent;
        this.displayName = chatMessage.displayName;
        this.uid = chatMessage.uid;

        const user = firebase.auth().currentUser;
        user.uid === this.chatMessage.uid ? this.isOwnMessage = true : this.isOwnMessage = false;
    }
}
