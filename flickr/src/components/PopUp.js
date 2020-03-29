import React, { Component } from 'react'

class PopUp extends Component {

    render() {

        const {imgsrcpath,pictitle} = this.props;

        return (
            <div className="images">
                <img className="img" src={imgsrcpath} alt={pictitle} ></img>
            </div>
        )
    }
}

export default PopUp
