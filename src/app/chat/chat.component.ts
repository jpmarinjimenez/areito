import { AfterViewChecked, Component, ElementRef, ViewChild } from "@angular/core";

@Component({
    selector: 'app-chat',
    templateUrl: 'chat.component.html',
    styleUrls: ['chat.component.css']
})
export class ChatComponent implements AfterViewChecked {
    @ViewChild('scroller') private feedContainer: ElementRef;

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
    }
}