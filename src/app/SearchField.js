import React, { Component } from 'react';
import axios from 'axios';
import PawnedListItem from './PawnedListItem';
import './SearchField.css';
import SoundCloudAudio from 'soundcloud-audio';

export default class SearchField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPawnedEmail: '',
            pawnedList: [],
            intiated: false,
            displayMessage: '',
            displayMessageStyle: ''
        };

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.checkIsPawned = this.checkIsPawned.bind(this);
        this.breachItems = [];
        this.displayMessage;
        this.musicPlayer = new SoundCloudAudio('1b0ff6d5c4606e7fdf5d744be591b5a4');
        console.log(SoundCloudAudio);
    }

    render() {

        if (this.state.pawnedList.length > 0) {
            this.breachItems = this.state.pawnedList.map((breach) => {
                return <PawnedListItem key={breach.Domain} breach={breach} />
            });
        } else {
            this.breachItems = [];
        }

        return (
            <div className="searchWrapper">
                <div className="search">
                    <div className="title">
                        <label className="hover-field glitch-text" data-text="isPawned">
                            isPawned
                        <span>Check wheather your email address is Pawned anywhere</span>
                        </label>
                    </div>
                    <input className="email-field pulse" type="email" placeholder="Enter an Email ID" onKeyPress={(event) => { if (event.key == 'Enter') this.checkIsPawned.call() }} onChange={(event) => this.setState({ isPawnedEmail: event.target.value })} required onFocus={this.onFocus} onBlur={this.onBlur} />
                    <button className="kool-button-black check-button hover-field" onClick={this.checkIsPawned}>Check
                    </button>
                </div>
                <div className={`display-message ${this.state.displayMessageStyle}`}>
                    {this.state.displayMessage}
                </div>
                <div className="searchResults">
                    {this.breachItems}
                </div> 
            </div>
        );
    }

    componentDidMount() {
        this.musicPlayer.stop(); // fallback
        if (!this.musicPlayer.playing) {
            this.musicPlayer.resolve('https://soundcloud.com/djangodjango/first-light', (playlist) => {

                console.log(playlist);

                this.musicPlayer.play();

                this.musicPlayer.on('ended', () => {
                    this.musicPlayer.play();

                });
            });
        }
    }

    onFocus(e) {
        if (e.target.classList.contains('pulse')) {
            e.target.classList.remove('pulse');
        }
    }

    onBlur(e) {
        if (!e.target.classList.contains('pulse') && e.target.value.length == 0) {
            e.target.classList.add('pulse');
        }
    }

    checkIsPawned() {
        // axios.get()
        this.setState({
            intiated: true
        });
        console.log(this.state.isPawnedEmail)
        axios({
            method: 'get',
            url: `https://haveibeenpwned.com/api/v2/breachedaccount/${this.state.isPawnedEmail}`
        }).then((response) => {
            const breachList = response.data;
            this.setState({
                pawnedList: response.data,
                displayMessage: `Your email address is Pawned on ${breachList.length} websites`,
                displayMessageStyle: 'not-safe-message'
            });
        }).catch((error) => {
            console.log('Error ', error);
            if (error.response.status === 404) {
                this.setState({
                    displayMessage: `You are safe now.`,
                    displayMessageStyle: 'safe-message',
                    pawnedList: []
                });
            }
        })
    }
}