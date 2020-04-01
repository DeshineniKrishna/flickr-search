import React, { Component } from 'react'
import './App.css';
import axios from 'axios';
import Loader from './images/loader.gif';
import Headroom from 'react-headroom';
// import Header from './components/Header/Index';
import Content from './components/Content/Index';
import Modal from './components/Modal/Modal';
import RenderSuggestions from './components/Suggestions/RenderSuggestions';

const API_KEY = "ddc5d1ba3cdaab1b91800104a69f31eb";
var option2 = [];

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
        var imgsrcpath = `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`;
        return(
          <div key={pic.secret} className="images" onClick={() => this.show(imgsrcpath,pic.title)}>
              <img 
              key={ pic.farm + pic.secret + pic.id + pic.server +pic.owner + pic.isfriend + pic.isfamily + pic.title} 
              className="img" src={imgsrcpath} alt={pic.title} ></img>
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

  updateSearch = async(newValue) => {
    this.setState({
      text: newValue.target.value,
    });

    if(newValue.target.value === ""){
      this.setState({
        search: "cats",
      });
    }else{
      this.setState({ 
        search: newValue.target.value, 
      });
    }

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
    if(this.state.search !== "cats"){
      const regex =new RegExp(`${this.state.search}` , 'i');
      suggestions = this.state.items.sort().filter(v => regex.test(v));
    }
    this.setState({suggestions});

    let option1 = [];
    option1 = await this.state.search;

    option2.push(option1)

    let uniqueOptions = [...new Set(option2)];

    this.setState({
        items : uniqueOptions,
    });

    // await this.storeQuery(this.state.search);
  }

  suggestionSelected = async(e) =>{
    this.setState({
      text : e,
      suggestions : [],
    });
    await this.updateSearch(this.state.text);
  }

  render() {

    const {isLoading,imagegallery,visible} = this.state;

    return (
      <div className="app-container">

          <Headroom className="headroom">
              <header>
                  <label htmlFor="searching" className="container">
                    <input
                          placeholder = "Type something to search..." 
                          type = "text"
                          className= "searchbar"
                          onChange = {this.updateSearch}
                          value = {this.state.text}
                    />             
                  {/* <ul>
                      {this.state.suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
                  </ul> */}
                  </label>
              </header>
          </Headroom>

          <RenderSuggestions 
              suggestions = {this.state.suggestions} 
              suggestselect = {this.suggestionSelected}
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