import React, { Component } from 'react'

class Content extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    

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
