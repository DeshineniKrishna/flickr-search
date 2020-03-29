import React, { Component } from 'react'
import Modal from 'react-responsive-modal';

class PopUp extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
            open : false,
        }
    }
    
    onOpenModal = () => {
        this.setState({ open: true });
      };
    
    onCloseModal = () => {
        this.setState({ open: false });
      };

    render() {

        const {imgsrcpath,pictitle} = this.props;
        const {open} = this.state;

        return (
            <div onClick={this.onOpenModal}>
                <Modal open={open} onClose={this.onCloseModal} center>
                        <img src={imgsrcpath} alt="asf"></img>
                </Modal>

                <div className="images">
                    <img className="img" src={imgsrcpath} alt={pictitle} ></img>
                </div>
            </div>
        )
    }
}

export default PopUp
