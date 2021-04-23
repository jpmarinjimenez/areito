import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { ChatService } from '../chat.service';

@Component({
    selector: 'chat-users-list',
    templateUrl: 'chat-users-list.component.html',
    styleUrls: ['chat-users-list.component.css'],
})
export class ChatUsersListComponent {
    users: User[];

    constructor(chat: ChatService) {
        chat.getUsers().subscribe((users) => {
            this.users = users;
        });
    }
}
