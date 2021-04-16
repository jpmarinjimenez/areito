import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class ChatService {
    sendMessage = (message: string) => {
        console.log(message);
    }
}