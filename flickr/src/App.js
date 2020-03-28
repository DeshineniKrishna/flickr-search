import React, { Component } from 'react'
import './App.css';
import axios from 'axios';
import Header from './components/Header/Index';
import Content from './components/Content/Index';
import Headroom from 'react-headroom'


const API_KEY = "ddc5d1ba3cdaab1b91800104a69f31eb";

class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       imagegallery : [],
    }
  }

  componentDidMount(){

    const URL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=cats&page=1&format=json&nojsoncallback=1`

    axios.get(URL).then((res) => {
      console.log("DATA: ",res);
      return res.data;
    }).then((data) => {
          let picArr = data.photos.photo.map((pic) => {
              var imgsrcpath = `https://farm`+pic.farm+`.staticflickr.com/`+pic.server+`/`+pic.id+`_`+pic.secret+`.jpg`;
              return(
                <img src={imgsrcpath} alt="pics" ></img>
              )
          })
          this.setState({
            imagegallery : picArr,
          })
    }).catch((err) => {
      if(err){
        console.error("Cannot fetch data from API, ", err);        
      }
    })
  }
  
  render() {

    const {imagegallery} = this.state;

    return (
      <div className="app-container">
        <div className="main-container">

          <div className="header">
            <Headroom className="headroom">
              <Header/>
            </Headroom>
          </div>

          <div className="content">
           <Content imagegallery={imagegallery}/>
          </div>

        </div>        
      </div>
    )
  }
}

export default App
