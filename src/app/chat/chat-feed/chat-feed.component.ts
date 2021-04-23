import { Component, OnInit, OnChanges } from "@angular/core";
import { ChatService } from "../chat.service";
import { Observable } from "rxjs";

@Component({
    selector: "chat-feed",
    templateUrl: "chat-feed.component.html",
    styleUrls: ["chat-feed.component.css"],
})
export class ChatFeedComponent implements OnInit, OnChanges {
    feed: Observable<any[]>;

    constructor(private chatService: ChatService) {}
    
    ngOnInit() {
        this.feed = this.chatService.getMessages();
    }

    ngOnChanges() {
        this.feed = this.chatService.getMessages();
    }
}
