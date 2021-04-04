import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { PlayerService } from "./player.service";

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css']
})

export class PlayerComponent {
    audio;
    playing = false;

    infoInterval: any;
    currentSongInfo = {
        artist: '',
        title: '',
        imageurl: ''
    };

    constructor(private playerService: PlayerService) {
        this.updateInfo();
        this.audio = new Audio('http://server2.ejeserver.com:8332/stream');
    }

    play = () => {
        this.audio.play();
        this.playing = true;
        this.infoInterval = setInterval(this.updateInfo, 30000);
    }

    pause = () => {
        this.audio.pause();
        this.playing = false;
        clearInterval(this.infoInterval);
    }

    updateInfo = () => {
        let infoObs: Observable<any>;
        infoObs = this.playerService.getStatus();
        
        infoObs.subscribe(
            (responseData) => {
                this.currentSongInfo.artist = responseData.data[0].track.artist;
                this.currentSongInfo.title = responseData.data[0].track.title;
                
                if (responseData.data[0].track.imageurl === 'https://server2.ejeserver.com:2197/static/areitoradio/covers/nocover.png') {
                    this.currentSongInfo.imageurl = 'assets/img/areitodisco.png'
                } else {
                    this.currentSongInfo.imageurl = responseData.data[0].track.imageurl;
                }

                document.title = this.currentSongInfo.artist + ' - ' + this.currentSongInfo.title;
            }
        );
    }
}