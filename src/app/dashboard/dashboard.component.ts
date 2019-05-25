import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { StateService, State } from 'src/lib/service/state.service';
import { SpotifyService } from 'src/lib/service/spotify.service';
import { CurrentSongContext } from 'src/lib/service/spotify.model';

import { of, Observable } from 'rxjs';
import { take, repeat, takeWhile, delay } from 'rxjs/operators';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.html',
    styleUrls: [ './dashboard.css' ]
})
export class DashboardComponent implements OnInit {
    constructor(private router: Router, private stateService: StateService, private spotify: SpotifyService) {
        this.stateService.stateSubject.subscribe((state) => {
            this.state = state;
        });
    }

    currentSong: CurrentSongContext;
    state: State;
    
    getYear = () => new Date().getFullYear();
    
    ngOnInit() {
        this.spotify.getCurrentTrack().subscribe((data) => {
            this.updateCurrentSong(data);
            this.monitorSong();
        });
    }

    updateCurrentSong(song: CurrentSongContext) {
        this.currentSong = song;

        let isListening = false;

        if (song) isListening = true;

        this.state = {
            ...this.stateService.getState(),
            activeSong: song,
            isListening: isListening
        }

        this.stateService.updateState(this.state);
    }

    nextSong() {
        this.spotify.nextSong().subscribe((song) => {
            this.currentSong = song;
        });
    }

    previousSong() {
        this.spotify.previousSong().subscribe((song) => {
            this.currentSong = song;
        });
    }

    monitorSong() {
        let delayed = of(true).pipe(delay(4000));

        delayed.pipe(repeat(-1), takeWhile(() => true)).subscribe(() => {
            this.spotify.getCurrentTrack().subscribe((song) => {
                this.updateCurrentSong(song);
            });
        });
    }
}