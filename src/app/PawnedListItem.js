import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import './PawnedListItem.css';
export default class PawnedListItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="breach">
                <div className="breach-name">
                    {this.props.breach.Title} ({this.props.breach.Domain?this.props.breach.Domain:'No Domain'})
                </div>
                <div className="breach-description">
                    {renderHTML(this.props.breach.Description)}
                </div>

            </div>
        )
    }
}