import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { environment } from "../environments/environment";

// Components
import { AppComponent } from "./app.component";
import { AuthComponent } from "./auth/auth.component";
import { MenuComponent } from "./menu/menu.component";
import { HomeComponent } from "./home/home.component";
import { CarouselComponent } from "./carousel/carousel.component";
import { PlayerComponent } from "./player/player.component";
import { ChatComponent } from "./chat/chat.component";
import { ChatFormComponent } from "./chat/chat-form/chat-form.component";

// Modules
import { AppRoutingModule } from "./app-routing.module";
import { ServiceWorkerModule } from "@angular/service-worker";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

// Firebase
import firebase from "firebase/app";
import { AngularFireModule } from "@angular/fire";

@NgModule({
    declarations: [AppComponent, AuthComponent, MenuComponent, PlayerComponent, HomeComponent, CarouselComponent, ChatComponent, ChatFormComponent],
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
        AngularFireModule.initializeApp(environment.firebase),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
