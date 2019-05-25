import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserData, CurrentSongContext } from './spotify.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class SpotifyService {
    constructor(private http: HttpClient, private router: Router) {
    }

    url: string = "https://api.spotify.com/v1";

    getCurrentTrack(): Observable<CurrentSongContext> {
        const headers = this.getHeaders();

        return this.http.get<CurrentSongContext>(`${this.url}/me/player/currently-playing`, { headers });
    }

    nextSong(): any {
        const headers = this.getHeaders();
        
        return this.http.post(`${this.url}/me/player/next`, null, { headers });
    }

    previousSong(): any {
        const headers = this.getHeaders();

        return this.http.post(`${this.url}/me/player/previous`, null, { headers });
    }
    
    getHeaders(): HttpHeaders {
        const userData: UserData = JSON.parse(window.localStorage.getItem('userData'));

        if (!userData && this.isExpired(userData.expiration_time)) {
            this.router.navigate(['/login']);
        }

        return new HttpHeaders({
            "Authorization": `Bearer ${userData.userAccessToken}`
        });

    }

    isExpired(expiration, timestamp = new Date().getTime()) {
        return (timestamp >= expiration) || false;
    }

}