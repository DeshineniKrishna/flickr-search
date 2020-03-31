import React, { Component } from 'react'
import './Style.css'
import Headroom from 'react-headroom';

class Header extends Component {
    render() {
        return (
            <Headroom className="headroom">
                <header>
                    <label className="container">
                        <input 
                            className="searchbar" 
                            type="text" 
                            placeholder="Type something to search..." 
                            onChange={this.props.updateSearch}
                        />
                    </label>
                </header>
            </Headroom>
        )
    }
}

export default Header