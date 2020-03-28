import React, { Component } from 'react'
import './App.css';
// import axios from 'axios';
import Header from './components/Header/Index';
import Content from './components/Content/Index';

class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }

  componentDidMount(){

  }
  
  render() {
    return (
      <div className="app-container">
        <div className="main-container">
          <div className="header">
            <Header/>
          </div>
          <div className="content">
            <Content/>
          </div>
        </div>        
      </div>
    )
  }
}

export default App
