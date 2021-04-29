import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
    selector: 'chat-users-list',
    templateUrl: 'chat-users-list.component.html',
    styleUrls: ['chat-users-list.component.css'],
})
export class ChatUsersListComponent implements OnDestroy {
    users: any[];
    chatSucription;

    constructor(private chatService: ChatService) {
        this.chatSucription = this.chatService.getUsers().subscribe((users) => {
            this.users = users;
        });
    }

    ngOnDestroy () {
        this.chatSucription.unsubscribe();
    }
}
