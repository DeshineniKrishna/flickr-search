import React, { Component } from 'react'
import './Style.css'
// import Headroom from '../../index'

class Header extends Component {
    render() {
        return (
        <div className="header">

{/* <Headroom style={{
  webkitTransition: 'all .5s ease-in-out',
  mozTransition: 'all .5s ease-in-out',
  oTransition: 'all .5s ease-in-out',
  transition: 'all .5s ease-in-out'
}}> */}

            <header>
                <div className="container">
                    <input className="searchbar" type="text" placeholder="Type something to search..." />
                </div>
            </header>

            {/* </Headroom> */}

        </div>
        )
    }
}

export default Header