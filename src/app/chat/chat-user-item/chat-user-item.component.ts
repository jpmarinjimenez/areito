import { Component, Input } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
    selector: 'chat-user-item',
    templateUrl: './chat-user-item.component.html',
    styleUrls: ['./chat-user-item.component.css'],
})
export class ChatUserItemComponent {
    @Input() user: User;

    constructor() {}
}
