import React, { Component } from 'react'
import './Style.css'

class Header extends Component {
    render() {
        return (
        <div className="header">


            <header>
                <div className="container">
                    <input className="searchbar" type="text" placeholder="Type something to search..." />
                </div>
            </header>


        </div>
        )
    }
}

export default Header