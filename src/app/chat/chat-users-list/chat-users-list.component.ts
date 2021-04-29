import { Component } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
    selector: 'chat-users-list',
    templateUrl: 'chat-users-list.component.html',
    styleUrls: ['chat-users-list.component.css'],
})
export class ChatUsersListComponent {
    users: any[];

    constructor(private chatService: ChatService) {
        this.chatService.getUsers().subscribe((users) => {
            this.users = users;
        });
    }
}
