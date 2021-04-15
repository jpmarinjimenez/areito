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

// Modules
import { AppRoutingModule } from "./app-routing.module";
import { ServiceWorkerModule } from "@angular/service-worker";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

// Firebase
import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCje_HuiuYj-FoZQor2maqk6Pi2yFHdZKE",
    authDomain: "areito-radio.firebaseapp.com",
    databaseURL: "https://areito-radio-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "areito-radio",
    storageBucket: "areito-radio.appspot.com",
    messagingSenderId: "521531747151",
    appId: "1:521531747151:web:1751b90098e2699452b33a",
    measurementId: "G-9WVG3FCZ9D",
};

firebase.initializeApp(firebaseConfig);

@NgModule({
    declarations: [AppComponent, AuthComponent, MenuComponent, PlayerComponent, HomeComponent, CarouselComponent],
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
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
