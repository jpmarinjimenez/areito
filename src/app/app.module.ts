import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { MenuComponent } from "./menu/menu.component";
import { ChatComponent } from "./chat/chat.component";
import { SocialComponent } from "./social/social.component";
import { PlayerComponent } from "./player/player.component";

import { AppRoutingModule } from "./app-routing.module";
import { ServiceWorkerModule } from "@angular/service-worker";

import { environment } from "../environments/environment";

@NgModule({
    declarations: [AppComponent, MenuComponent,PlayerComponent, ChatComponent, SocialComponent],
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
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
