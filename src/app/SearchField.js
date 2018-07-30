import React, { Component } from 'react';
import axios from 'axios';
import PawnedListItem from './PawnedListItem';

export default class SearchField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPawnedEmail: '',
            pawnedList: []
        };

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.checkIsPawned = this.checkIsPawned.bind(this);
        this.videoItems = [];
    }

    render() {

        if (this.state.pawnedList.length > 0) {
            this.videoItems = this.state.pawnedList.map((breach) => {
                return <PawnedListItem key={breach.Domain} breach={breach} />
            });
        }

        return (
            <div className="searchWrapper">
                <div className="search">
                    <div className="title">
                        <label>isPawned</label>
                    </div>
                    <input className="email-field pulse" type="email" placeholder="An Email Id" onChange={(event) => this.setState({ isPawnedEmail: event.target.value })} required onFocus={this.onFocus} onBlur={this.onBlur} />
                    <button className="kool-button-black check-button" onClick={this.checkIsPawned}>Check</button>
                </div>
                <div className="searchResults">
                {this.videoItems}
                </div>
            </div>
        );
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
        console.log(this.state.isPawnedEmail)
        axios({
            method: 'get',
            url: `https://haveibeenpwned.com/api/v2/breachedaccount/${this.state.isPawnedEmail}`
        }).then((response) => {
            console.log(response);
            this.setState({
                pawnedList: response.data
            })
        }).catch((error) => {
            console.log('Error ', error);
        })
    }
}