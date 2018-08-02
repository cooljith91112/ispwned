import React, { Component } from 'react';
import './Footer.css';

export default class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer>
                <div className="things">
                    <span className="child">API</span>->
            <span className="child">
                        <a href="https://haveibeenpwned.com/">haveibeenpwned</a>
                    </span>

                </div>
                <div className="things">
                    <span className="child">Layout Design</span>->
            <span className="child">
                        <a href="mailto:venture666666@gmail.com">Rajesh K P</a>
                    </span>
                </div>
                <div className="things">
                    <span className="child">Everything else</span>->
            <span className="child">
                        <a href="https://twitter.com/indrajithKLIS">Indrajith K L</a>
                    </span>
                </div>
            </footer>
        );
    }
}