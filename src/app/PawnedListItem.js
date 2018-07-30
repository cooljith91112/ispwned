import React,{Component} from 'react';

export default class PawnedListItem extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
           <div>
               {this.props.breach.Description}
           </div>
        )
    }
}