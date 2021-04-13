import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent {
    title = "areito";
    menuOpen: boolean = false;

    toggleMenu = (value: boolean) => {
        this.menuOpen = value;

        if (this.menuOpen) {
            document.body.classList.add("menu-open");
        } else {
            document.body.classList.remove("menu-open");
        }
    };
}
