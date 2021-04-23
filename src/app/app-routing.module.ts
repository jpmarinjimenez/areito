import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { ChatComponent } from "./chat/chat.component";

import { AuthGuard } from "./auth/auth.guard";
import { AuthComponent } from "./auth/auth.component";

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path:'login', component: AuthComponent },
    { path:'chat', component: ChatComponent, canActivate:[AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
