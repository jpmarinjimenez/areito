import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ChatIframeComponent } from "./chatIframe/chatIframe.component";
import { HomeComponent } from "./home/home.component";
import { SocialComponent } from "./social/social.component";

const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'chat-iframe', component: ChatIframeComponent },
    { path: 'social', component: SocialComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
