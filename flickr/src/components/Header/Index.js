import React, { Component } from 'react'
import './Style.css'
import Headroom from 'react-headroom';

class Header extends Component {
    render() {
        return (
            <Headroom className="headroom">
                <header>
                    <label htmlFor="searching" className="container">
                    <input
                            placeholder = "Type something to search..." 
                            type = "text"
                            className= "searchbar"
                            onChange = {this.props.onChange}
                            value = {this.props.value}
                            autoFocus= "autofocus"
                    />             
                    </label>
                </header>
            </Headroom>
        )
    }
}

export default Header