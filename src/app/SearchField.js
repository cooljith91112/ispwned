import React, { Component } from 'react';
import axios from 'axios';
import PawnedListItem from './PawnedListItem';
import './SearchField.css';
import Footer from './Footer';

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
            <div>
                <div id="wrapper">
                    <div className="searchWrapper">
                        <div className="search">
                            <div className="title">
                                <label className="hover-field glitch-text" data-text="notPwned">
                                    isPwned
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
                </div>
                <Footer />
            </div>
        );
    }

    componentDidMount() {

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
        axios({
            method: 'get',
            url: `https://ispwned.glitch.me/${this.state.isPawnedEmail}`
        }).then((response) => {
            const breachList = response.data;
            this.setState({
                pawnedList: response.data,
                displayMessage: `Your email address is Pwned on ${breachList.length} websites`,
                displayMessageStyle: 'not-safe-message'
            });
        }).catch((error) => {
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