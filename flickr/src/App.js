import React, { Component } from 'react'
import './App.css';
import axios from 'axios';
import Content from './components/Content/Index';
import Headroom from 'react-headroom';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import Loader from './images/loader.gif'

const API_KEY = "ddc5d1ba3cdaab1b91800104a69f31eb";

class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       data: {}, 
       imagegallery : [],
       isLoading : true,
       imgsource: "",
       imagetitle: "",
       visible: false,
       page : 1,
       search:"",
    }
  }

  async fetchdata(search){
    let URL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=${search}&page=${this.state.page}&format=json&nojsoncallback=1`;
    let res = await axios.get(URL);
    let data = await res.data.photos;
    return data;
  }

  LoadPics =  async(search) => {
    let data = await this.fetchdata(search);    
    this.setState({
      data:data,
    });
    if(this.state.data){
      let picArr = this.state.data.photo.map((pic) => {
        var imgsrcpath = `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`;
        return(
          <div key={pic.secret} className="images" onClick={() => this.show(imgsrcpath,pic.title)}>
              <img key={pic.secret + pic.id} className="img" src={imgsrcpath} alt={pic.title} ></img>
          </div>
        )
      })
      return picArr;
    }else{
      return null;
    }
  }

  loadMore = async() => {
    this.setState({
      page: this.state.page + 1,
      isLoading: true,
    });

    let imageArray = await this.LoadPics(this.state.search);
    if (imageArray) {
      let newArray = this.state.imagegallery.concat(imageArray);
      this.setState({
        imagegallery: newArray,
        isLoading: false,
      });
    }
  };

  handleScroll = () => {
    if (
      window.innerHeight + window.scrollY + 1000 >=
      document.body.offsetHeight
    ) {
      this.loadMore();
    }
  };

  async componentDidMount(){
      let images = await this.LoadPics("cats");
      this.setState({
        search: "cats",
        isLoading: false,
        imagegallery : images,
      });
      window.addEventListener("scroll", this.handleScroll);  
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  show = (imgsrcpath,title) => {
    this.setState({ visible: true , imgsource : imgsrcpath, imagetitle : title });
  }
 
  hide() {
    this.setState({ visible: false });
  }

  updateSearch = async(e) => {

    await this.setState({ 
      search: e.target.value, 
      imagegallery : [],
      page : 1,
      isLoading: true,
    });

    if(this.state.search === ""){
      this.setState({
        search: "cats",
      });
    }

    console.log(this.state.search);
    let images = await this.LoadPics(this.state.search);

    this.setState({
      isLoading: false,
      imagegallery : images,
    });
  }

  render() {

    const {isLoading,imagegallery} = this.state;

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
                          onChange={this.updateSearch}
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

          <div className="content">
          <Content imagegallery={imagegallery}/>
          </div>
          
          <Rodal width={"100vw"} height={"100vh"} visible={this.state.visible} onClose={this.hide.bind(this)}>
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
