import { Component } from "@angular/core";

@Component({
    selector: "app-menu",
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.css"],
})
export class MenuComponent {
    menuOpen: boolean = false;

    constructor() {}

    toggleMenu = () => {
        this.menuOpen = !this.menuOpen;
        
        if (this.menuOpen) {
            document.body.classList.add("menu-open");
        } else {
            document.body.classList.remove("menu-open");
        }
    };
}
