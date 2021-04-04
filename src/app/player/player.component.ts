import { Component } from "@angular/core";

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css']
})

export class PlayerComponent {
    audio;
    playing = false;

    constructor() {
        this.audio = new Audio('http://server2.ejeserver.com:8332/stream');
        this.audio.play();
    }

    play = () => {
        this.audio.play();
        this.audio.muted = false;
        this.playing = true;
    }

    pause = () => {
        this.audio.pause();
        this.playing = false;
    }
}