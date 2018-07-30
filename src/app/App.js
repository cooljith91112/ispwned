import React, {Component} from 'react';
import SearchField from './SearchField';

export default class App extends Component {
    
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div id="content">
            <SearchField />
            </div>
        );
    }
}