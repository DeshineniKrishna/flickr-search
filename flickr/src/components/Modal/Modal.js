import React, { Component } from 'react'

import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

class Modal extends Component {
    render() {
        return (
            <div>
                <Rodal width={"100vw"} height={"100vh"} visible={this.props.visible} onClose={this.props.onClose}>
                    <div className="zoomimages">
                        <img className="imageszoomed" src={this.props.src} alt={this.props.alt}/>
                        <h2 className="titledisplay"> {this.props.alt} </h2>
                    </div>
                </Rodal>        
            </div>
        )
    }
}

export default Modal
