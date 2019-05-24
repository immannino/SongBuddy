import { Component, OnInit } from "@angular/core";
import { StateService } from 'src/lib/service/state.service';
import { CurrentSongContext } from 'src/lib/service/spotify.model';

@Component({
    selector: 'track-details',
    templateUrl: './track-details.html',
    styleUrls: [ './track-details.css' ]
})
export class TrackDetailsComponent implements OnInit {
    constructor(private stateService: StateService) {
        this.stateService.stateSubject.subscribe((state) => {
            this.currentSong = state.activeSong;
        });
    }
    currentSong: CurrentSongContext;

    ngOnInit() {
        this.currentSong = this.stateService.getState().activeSong;
    }
}