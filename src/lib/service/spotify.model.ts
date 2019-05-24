/**
 * Depricated: Was used for initial testing.
 * 
 * Replaced by SpotifyTrack Object (simplified)
 */
export class SpotifySong {
    artist: string;
    song: string;

    constructor(artist: string = "", song: string = "") {
        this.artist = artist;
        this.song = song;
    }
}

/**
 * UserData for Spotify User Auth data. 
 */
export class UserData {
    userAccessToken: string;
    refreshTokenTimeout: number;
    state: string;
    token_type: string;
    expiration_time: number;

    constructor(token: string = "", timeout: number = 0, token_type: string = "", state: string = "") {
        this.userAccessToken = token;
        this.refreshTokenTimeout = timeout;
        this.state = state;
        this.token_type = token_type;
    }
}

export class CurrentSongContext {
    context: any; // Don't currently need this, not sure what all exists for it either
    timestamp: number;
    progress_ms: number;
    is_playing: boolean;
    currently_playing_type: string;
    actions: any;
    item: PlaybackItem;
}

export class PlaybackItem {
    album: Album;
    artists: Artist[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: any;
    external_urls: SpotifyUrl;
    href: string;
    id: string;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}

export class Album {
    album_type: string;
    external_urls: SpotifyUrl;
    href: string;
    id: string;
    images: Image[];
    name: string;
    type: string;
    uri: string;
}

export class SpotifyUrl {
    spotify: string;
}

export class Image {
    height: number;
    url: string;
    width: number;
}

export class Artist {
    external_urls: SpotifyUrl;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}