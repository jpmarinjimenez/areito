import { Component, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-menu",
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.css"],
})
export class MenuComponent {
    @Output() menuToggled = new EventEmitter<boolean>();

    menuOpen: boolean = false;

    toggleMenu = () => {
        this.menuOpen = !this.menuOpen;
        this.menuToggled.emit(this.menuOpen);
    };
}
