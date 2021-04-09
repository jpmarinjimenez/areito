import { Component } from "@angular/core";
import { NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "app-carousel",
    templateUrl: "carousel.component.html",
    styleUrls: ["carousel.component.css"],
})
export class CarouselComponent {
    carouselEl: any;
    imagenesCarousel = [
        { url: "/assets/carousel/hector-lavoe.jpg", positionXS: "center" },
        { url: "/assets/carousel/saxo.jpg", positionXS: "center" },
        { url: "/assets/carousel/trombon.jpg", positionXS: "right" },
        { url: "/assets/carousel/bajista.jpg", positionXS: "center" },
        { url: "/assets/carousel/tito-puente.jpg", positionXS: "center" },
        { url: "/assets/carousel/bajo.jpg", positionXS: "center" },
        { url: "/assets/carousel/bongo.jpg", positionXS: "center" },
        { url: "/assets/carousel/conga.jpg", positionXS: "center" },
        { url: "/assets/carousel/mongo.jpg", positionXS: "center" },
    ];

    constructor(config: NgbCarouselConfig) {
        config.interval = 6000;
        config.showNavigationArrows = false;
        config.showNavigationIndicators = false;
        config.wrap = true;
        config.keyboard = false;
        config.pauseOnHover = false;
    }
}
