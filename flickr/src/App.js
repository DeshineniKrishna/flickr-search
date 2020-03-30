import React, { Component } from 'react'
import './App.css';
import axios from 'axios';
// import Header from './components/Header/Index';
import Content from './components/Content/Index';
import Headroom from 'react-headroom';
// import Modal from 'react-responsive-modal';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import Loader from './images/loader.gif'

const API_KEY = "ddc5d1ba3cdaab1b91800104a69f31eb";

class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       imagegallery : [],
       isLoading : true,
       imgsource: "",
       imagetitle: "",
       visible: false,
       page : 1,
       search:"",
    }
  }

  show = (imgsrcpath,title) => {
    this.setState({ visible: true , imgsource : imgsrcpath, imagetitle : title });
  }
 
  hide() {
    this.setState({ visible: false });
  }

  // updateSearch = (query) => {
  //   this.setState({ search: query });
  // }

  // const promise1 = 


  async fetchdata(search){

    let URL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=${search}&page=${this.state.page}&format=json&nojsoncallback=1`;

    let res = await axios.get(URL);    

    let data = await res.data.photos.photo;
    return data;
  }

  LoadPics = (search) => {

    let data = this.fetchdata(search);
    console.log(data);

    // const URL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=${search}&page=${this.state.page}&format=json&nojsoncallback=1`;

    //  axios.get(URL)
    //               .then((res) => {
    //   (this.state.search === "") ? console.log("cats") : console.log(this.state.search+"desi");
    //   console.log("DATA: ",res);
    //   return res.data;
    //   }).then((data) => {
    //         if(data.photos.photo.length !== 0){
    // let picArr = data.map((pic) => {
    //   var imgsrcpath = `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`;
    //   return(
    //     <div className="images" onClick={() => this.show(imgsrcpath,pic.title)}>
    //         <img className="img" src={imgsrcpath} alt={pic.title} ></img>
    //     </div>
    //   )
    // })
    //         console.log(picArr);
    //         return picArr;
    //       }
    //       // console.log(this.state.imagegallery);
    // }).catch((err) => {
    //   if(err){
    //     console.error("Cannot fetch data from API, ", err);        
    //   }
    // })

  }

  componentDidMount(){
      let images = this.LoadPics("cats");
      this.setState({
        isLoading: false,
        imagegallery : images,
      });

      console.log("check"+images);
      
  }

  render() {

    const {isLoading,imagegallery} = this.state;

    // console.log(this.state.imagegallery)

    return (
      <div className="app-container">
        <div className="main-container">

          <Headroom className="headroom">
          <header>
                <label className="container">
                    <input 
                          className="searchbar" 
                          type="text" 
                          placeholder="Type something to search..." 
                          // value={this.state.search}
                          // onChange={this.updateSearch}
                    />
                </label>
            </header>
          </Headroom>

          {
            isLoading && 
            <div className="Loading">
                <img src={Loader} alt="Loading..."/>
            </div>
            
          }
          {
            !isLoading && (
            <div className="content">
            <Content imagegallery={imagegallery}/>
            </div> )
          }

          <Rodal visible={this.state.visible} onClose={this.hide.bind(this)}>
            <div className="zoomimages">
              <img className="imageszoomed" src={this.state.imgsource} alt={this.state.imagetitle}/>
              <h2 className="titledisplay"> {this.state.imagetitle} </h2>
            </div>
          </Rodal>

        </div>        
      </div>
    )
  }
}

export default App
