import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { UserData, CurrentSongContext } from './spotify.model';

@Injectable()
export class StateService {
    constructor() {}
    
    state: State = {
        userData: {
            userAccessToken: null,
            token_type: null,
            refreshTokenTimeout: null,
            state: null,
            expiration_time: null
        },
        activeSong: null,
        isListening: false
    };
    stateSubject: Subject<State> = new Subject<State>();

    /**
     * Return the current global state
     */
    getState(): State {
        return this.state;
    }

    /**
     * Update the current global state values.
     * 
     * @param newState The updated state variables
     */
    setState(newState: State) {
        this.state = {
            ...this.state,
            ...newState
        };
    }
    
    /**
     * Update with the new state and emit the state change to 
     * all listeners.
     */
    updateState(newState: State) {
        this.setState(newState);
        this.stateSubject.next(this.getState())
    }
}

/**
 * State model for this application
 */
export class State {
    userData: UserData;
    activeSong: CurrentSongContext;
    isListening: boolean;
}