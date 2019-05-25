import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SpotifyService } from 'src/lib/service/spotify.service';
import { StateService, State } from 'src/lib/service/state.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { UserData } from 'src/lib/service/spotify.model';
import { AppConfig } from '../app.config';

@Component({
    selector: 'login',
    templateUrl: 'login.html',
    styleUrls: [ 'login.css' ]
})
export class LoginComponent implements OnInit {
    constructor(
        private spotifyService: SpotifyService,
        private config: AppConfig,
        private router: Router,
        private sanitizer: DomSanitizer,
        private stateService: StateService
    ) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd ) {
                let data = event.urlAfterRedirects.split("#")[1];

                if (data && data !== '' && !data.includes("error")) {
                    let responseItems: string[] = data.split("&");
                    /**
                     * In the future, add logic to check that client state key is valid from response; 
                     */
                    this.userSpotifyLogin(responseItems);
                } else {
                    let currentToken: string = localStorage.getItem('auth_error');

                    if (currentToken && currentToken === "true") {
                        this.errorMessagePrimaryText = "Spotify session token has expired."
                        this.errorMessageSubText = "Please log back in.";
                        this.hasErrorOccurred = true;
                    }
                }
            }
          });
    }

    title = 'Spotify Television';
    errorMessagePrimaryText: string = "";
    errorMessageSubText: string = "";
    hasErrorOccurred: boolean = false;
    hrefUrl: SafeResourceUrl = "";
    client_id: string;

    ngOnInit() {
        this.client_id =  this.config.getConfig('spotify').clientid;
        this.generateSpotifyLoginUrl();
    }

    userSpotifyLogin(responseItems: string[]) {
        let tempUserData: UserData = {
            userAccessToken: responseItems[0].split("=")[1],
            token_type: responseItems[1].split("=")[1],
            refreshTokenTimeout: Number(responseItems[2].split("=")[1]),
            state: responseItems[3].split("=")[1],
            expiration_time: 0
        };

        tempUserData.expiration_time = new Date().getTime() + (tempUserData.refreshTokenTimeout * 1000);

        window.localStorage.setItem('userData', JSON.stringify(tempUserData));

        this.router.navigate(['/dashboard']);
    }

    generateSpotifyLoginUrl() {
        let appRedirectUrl: string = this.config.getConfig('spotify').redirect_uri;
        
        /**
         * Update scopes to appropriate values for what information I'm requesting from the user.
         */
        let scopes: string = 'user-read-currently-playing user-read-playback-state user-modify-playback-state';

        let url = 'https://accounts.spotify.com/authorize' +
        '?client_id=' + this.client_id +
        '&redirect_uri=' + encodeURIComponent(appRedirectUrl) +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&response_type=token' + '&state=' + "";

        this.hrefUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    authUser() {
        this.navigateToDashboard();
    }

    navigateToDashboard() {
    }
}