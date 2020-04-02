import React, { Component } from 'react'
import './App.css';
import axios from 'axios';
import Loader from './images/loader.gif';

import Content from './components/Content/Index';
import Modal from './components/Modal/Modal';
import RenderSuggestions from './components/Suggestions/RenderSuggestions';
import Header from './components/Header/Index';

const API_KEY = "ddc5d1ba3cdaab1b91800104a69f31eb";
var key=0;

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
       suggestions: [],
       items : [],
       text : "",
    }
  }

  async fetchdata(search){
    let URL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=${search}&page=${this.state.page}&format=json&nojsoncallback=1`;
    let res = await axios.get(URL);
    let data = await res.data.photos;
    console.log(this.state.search + "<=check=>" + search);
    return data;
  }

  LoadPics =  async(search) => {
    let data = await this.fetchdata(search);    
    this.setState({
      data:data,
    });
    if(this.state.data){
      let picArr = this.state.data.photo.map((pic) => {
        key++;
        if(pic.farm !== 0){
          var imgsrcpath = `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`;
          return(
            <div key={key} className="images" onClick={() => this.show(imgsrcpath,pic.title)}>
                <img 
                key={key} 
                className="img" src={imgsrcpath} alt={pic.title} ></img>
            </div>
          )
        }return null;
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
    if(imageArray){
      let newArray = this.state.imagegallery.concat(imageArray);
      this.setState({
        imagegallery: newArray,
        isLoading: false,
      });
    }else{
      this.setState({
        isLoading: false,
      });      
    }
  };

  handleScroll = () => {
    if( window.innerHeight + window.scrollY + 1000 >= document.body.offsetHeight ) {
      this.loadMore();
    }
  };
 
  async componentDidMount(){
      let images = await this.LoadPics(("cats"));
      this.setState({
        isLoading: false,
        imagegallery : images,
        search: "cats",
      });

      let option =[];
      option = JSON.parse(window.localStorage.getItem("local_storage"));
  
      this.setState({
          items : option,
      });
      window.addEventListener("scroll", this.handleScroll);  
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  storeQuery = async(e) => {
    let local_storage = [];
    if (!window.localStorage.getItem("local_storage")) {   
      local_storage.push(e);
      window.localStorage.setItem("local_storage", JSON.stringify(local_storage));
      return;
    }

    const filter = (JSON.parse(window.localStorage.getItem("local_storage"))).filter(
                        value => value === e
                    );

    if(filter.length === 0){
      local_storage = JSON.parse(window.localStorage.getItem("local_storage"));
      local_storage.push(e);
      window.localStorage.setItem("local_storage", JSON.stringify(local_storage));   
    }
  }

  async updateSearch(){

    await this.setState({
      imagegallery : [],
      page : 1,
      isLoading: true,
    })

    let images = await this.LoadPics(this.state.search);

    this.setState({
      isLoading: false,
      imagegallery : images,
    });

    let suggestions = [];
    if(this.state.search !== "" && this.state.items !== null){
      const regex =new RegExp(`${this.state.search}` , 'i');
      suggestions = this.state.items.sort().filter(v => regex.test(v));
    }
    this.setState({suggestions});

    await this.storeQuery(this.state.search);

    let option =[];
    option = JSON.parse(window.localStorage.getItem("local_storage"));

    this.setState({
        items : option,
    });

  }

  show = (imgsrcpath,title) => {
    this.setState({ visible: true , imgsource : imgsrcpath, imagetitle : title });
  }
 
  hide() {
    this.setState({ visible: false });
  }

  startSearch = async(newValue) => {
    this.setState({
      text: newValue.target.value,
      search: newValue.target.value,
    });
    await this.updateSearch();
  }
  
  SelectSuggestions = async(newValue) => {
    this.setState({
      text: newValue,
      search: newValue,
    });
    await this.updateSearch();
    this.setState({
      suggestions : [],
    })
  }

  render() {

    const {isLoading,imagegallery,visible} = this.state;

    return (
      <div className="app-container">

          <div>
            <Header
                onChange = {this.startSearch}
                value = {this.state.text}
            />
          </div>

          <RenderSuggestions 
              suggestions = {this.state.suggestions} 
              suggestselect = {this.SelectSuggestions}
          /> 

          {  isLoading && 
            <div className="Loading">
                <img src={Loader} alt="Loading..."/>
            </div>           
          }

          <div className="content" min-height="100vh" >
            <Content imagegallery={imagegallery}/>
          </div>

          <Modal 
                 visible={visible} onClose={this.hide.bind(this)}
                 src={this.state.imgsource} alt={this.state.imagetitle}
          />

      </div>
    )
  }
}

export default App;