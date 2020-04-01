import React, { Component } from 'react'
import './Suggestions.css' 

class RenderSuggestions extends Component {
    render() {
        if(this.props.suggestions.length === 0){
            return null;
        }else{
            return (
                <ul>
                    {this.props.suggestions.map((item) => <li onClick={() => this.props.suggestselect(item)}>{item}</li>)}
                </ul>
            )
        }
    }
}

export default RenderSuggestions
