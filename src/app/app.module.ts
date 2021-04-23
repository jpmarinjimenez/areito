import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { environment } from "../environments/environment";

// Components
import { AppComponent } from "./app.component";
import { AuthComponent } from "./auth/auth.component";
import { MenuComponent } from "./menu/menu.component";
import { HomeComponent } from "./home/home.component";
import { CarouselComponent } from "./carousel/carousel.component";
import { PlayerComponent } from "./player/player.component";

// Chat
import { ChatComponent } from "./chat/chat.component";
import { ChatFormComponent } from "./chat/chat-form/chat-form.component";
import { ChatFeedComponent } from "./chat/chat-feed/chat-feed.component";
import { ChatMessageComponent } from "./chat/chat-message/chat-message.component";
import { ChatUsersListComponent } from "./chat/chat-users-list/chat-users-list.component";
import { ChatUserItemComponent } from "./chat/chat-user-item/chat-user-item.component";

// Modules
import { AppRoutingModule } from "./app-routing.module";
import { ServiceWorkerModule } from "@angular/service-worker";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

// Firebase
// import firebase from "firebase/app";
// firebase.initializeApp(environment.firebase);
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';


@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        MenuComponent,
        PlayerComponent,
        HomeComponent,
        CarouselComponent,
        ChatComponent,
        ChatFormComponent,
        ChatFeedComponent,
        ChatMessageComponent,
        ChatUsersListComponent,
        ChatUserItemComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ServiceWorkerModule.register("ngsw-worker.js", {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: "registerWhenStable:30000",
        }),
        NgbModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
