import React, { Component } from 'react'
import './Style.css'

class Content extends Component {

    render() {
        const {imagegallery} = this.props
        return (
            <div>
                <div className="editimages">
                    {imagegallery}
                </div> 
            </div>
        )
    }
}

export default Content
