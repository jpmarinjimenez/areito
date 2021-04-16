import { Component } from "@angular/core";
import { ChatService } from "../chat.service";

@Component({
    selector: "chat-form",
    templateUrl: "chat-form.component.html",
})
export class ChatFormComponent {
    message: string;

    constructor(private chatService: ChatService) {}

    send = () => {
        this.chatService.sendMessage(this.message);
    };

    handleSubmit(event: { keyCode: number; }) {
        if (event.keyCode === 13) {
            this.send();
        }
    }
}
