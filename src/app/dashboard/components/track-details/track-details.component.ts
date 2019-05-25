import { Component, OnInit } from "@angular/core";
import { StateService } from 'src/lib/service/state.service';
import { CurrentSongContext } from 'src/lib/service/spotify.model';
import { Title } from '@angular/platform-browser';
import { repeat, delay } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: 'track-details',
    templateUrl: './track-details.html',
    styleUrls: [ './track-details.css' ]
})
export class TrackDetailsComponent implements OnInit {
    constructor(private stateService: StateService, private title: Title) {
        this.stateService.stateSubject.subscribe((state) => {
            if (this.currentSong.item.name !== state.activeSong.item.name) {
                this.currentSong = state.activeSong;
                this.setSongTitle();
            }
        });
    }
    demoClass: string = 'demo-1';
    currentSong: CurrentSongContext;
    fullTitle: string = '';
    dynamicTitle: string = '';

    ngOnInit() {
        this.currentSong = this.stateService.getState().activeSong;
        this.setSongTitle();
        document.getElementById('container').classList.add(this.demoClass);
    }

    setSongTitle() {
        this.fullTitle = `${this.currentSong.item.name} - ${this.currentSong.item.artists[0].name}`;
        this.dynamicTitle = this.fullTitle;

        this.title.setTitle(this.fullTitle);

        // Gotta figure out how to clean up the timeout intervals.
        // Once the song changes, it doubles up the callbacks and messes up the title.
        // Just need to figure out a simple edit.
        // this.rotater();
    }

    updateClass() {
        document.getElementById('container').classList.remove(this.demoClass);
    }

    rotater () {
        if (this.dynamicTitle.length > 0) {
            const delayed = of({}).pipe(delay(250));
            delayed.subscribe(() => {
                let tempTitle = this.dynamicTitle.split('');
                tempTitle.shift();
                const title = tempTitle.join('');
                this.dynamicTitle = title;
                this.title.setTitle(this.dynamicTitle);
                this.rotater();
            });

        } else {
            const delayed = of({}).pipe(delay(1000));
            this.title.setTitle(this.fullTitle);

            delayed.subscribe(() => {
                this.dynamicTitle = this.fullTitle;
                this.rotater();
            });
        }

    }
}