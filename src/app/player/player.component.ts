import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PlayerService } from "./player.service";

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css']
})

export class PlayerComponent implements OnInit {
    audio;
    playing = false;
    DEFAULTDISKIMG = 'assets/img/areitodisco.png';
    NOCOVERIMG = 'https://server2.ejeserver.com:2197/static/areitoradio/covers/nocover.png';

    infoInterval: any;
    currentSongInfo = {
        artist: '',
        title: '',
        imageurl: this.DEFAULTDISKIMG
    };

    constructor(private playerService: PlayerService) {
        this.audio = new Audio('http://server2.ejeserver.com:8332/stream');
    }

    ngOnInit() {
        if (environment.production) {
            this.play();
        }
        this.updateInfo();
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
                
                if (responseData.data[0].track.imageurl === this.NOCOVERIMG) {
                    this.currentSongInfo.imageurl = this.DEFAULTDISKIMG;
                } else {
                    this.currentSongInfo.imageurl = responseData.data[0].track.imageurl;
                }

                document.title = this.currentSongInfo.artist + ' - ' + this.currentSongInfo.title;
            }
        );
    }
}