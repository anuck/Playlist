import React from 'react'
import { Link, Switch } from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import playlistComponent from './Playlist'




export default class Welcome extends React.Component {

  constructor(props){
      super(props);
      this.state = {
          listArray:[],
          catagoryList:[],
          searchText:'',
          option : ''
      }
      this.searchClick = this.searchClick.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.DropDownChang = this.DropDownChang.bind(this)
      
  }  
  
  componentDidMount() {
    const serverUrl = 'https://api.discogs.com/database/search?token=khppSkLHaYTxkWRhSYFBubVVeONIUKkrBgHdossa&per_page=5'
      fetch(serverUrl, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            this.setState({ listArray: data.results })  
            });
          
    const serverCategory='http://localhost:7558/listofArtist'
    fetch(serverCategory,{method:'GET'})
    .then(response=>response.json())
    .then(data => {                    
        this.setState({
            catagoryList:data
        })
        console.log("listing category",this.state.catagoryList);
    })                 
  }            

  handleSubmit(e) {
    e.preventDefault();
    
    fetch(`https://api.discogs.com/database/search?key=rBjkCdZMSGeNOmFemtuN&secret=lrkBhSgCqsZYelAmUIcHnWvApGtlujMp&artist="+`+e.target.search.value+`+"&country=canada"`)
      .then(response => response.json())
      
      .then(data => {
        this.setState({ listArray: data.results })
      });
  }        
        

  DropDownChang = (e) =>{      
    console.log("selected index:"+ e.target.options.selectedIndex)

    this.setState(
      {
        option : e.target.options.selectedIndex
      })
      console.log("log"+this.state.option)
  }

  handleAddToFavorite(id,title, uri, masterid,thumb) {
    
    console.log('fav title-->', title);
    console.log('fav uri-->', uri);
    console.log('fav master_id-->', masterid); 

    (async () => {
      const rawResponse = await fetch('http://localhost:7558/SaveTracks', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          title: title,
          uri: uri,
          master_id: masterid,
          playlist_id: id === this.state.option,
          thumb : thumb
        })
      });
      const content = await rawResponse.json();

      console.log("post data",content);
      
    })();
    alert("your favourite song has been added")
  } 

  searchClick(e)
  {

    const serverUrl = 'https://api.discogs.com/database/search?token=khppSkLHaYTxkWRhSYFBubVVeONIUKkrBgHdossa&artist='+e.target.value+'&country=canada'
    console.log(serverUrl);
    fetch(serverUrl, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            this.setState({ listArray: data.results })  
          })
  }

  render() {

    let td={
      width : '120px'
    }
    const countriesOption=this.state.catagoryList.map( country => <option key= {country.id + country.id} value={country.type }>{country.type}</option>)
    return(
      <>
        <Router>
          <nav>                
            <Link to="/playlist" class = "favoritePlaylist-link"><button class = "favoritePlaylist">Favourite Playlist</button></Link>               
          </nav>
          <Switch>
            <Route exact path="/playlist" component={playlistComponent} />
            {/* <Route  path="/" render={
              ()=>{
                
              }
              } /> */}
            
          </Switch>              
    
        </Router>
        
        <div className = "container">
          <div className="container pt-3 d-inline-flex navbar navbar-expand-sm">
            <form onSubmit={this.handleSubmit} className="form-group row">
              <div className = "searchEngine col-sm-10 ">
                <input type="text" className = "form-control " name="search" placeholder="Search.." ref="search" size = "200"
                onChange={this.searchClick} />
                <i class="fa fa-search"></i>              
              </div>
              
              {/* <button type="submit" style={styleButton}>Serach</button> */}
            </form>
          </div>
        </div>
          {/* <select style={styleButton} onChange={this.DropDownChange}>{this.state.allPlaylist}</select> */}
          
        <div className = "background">
          <h3>
            <table className = "table">
              <tr>  
                {this.state.listArray.map(data=>
                      <div className = "d-inline-flex p-3">
                        <td className = "col-md-4" style = {td}><img  src={data.thumb}  /></td>
                        
                        <td className = "col-md-3" style = {td}>{data.title}</td>
                        <td className = "col-md-3" style = {td}>{data.type}</td>
                        
                        <td className = "col-md-3" style = {td}><select className="btn btn-basic dropdown-toggle" 
                            onChange={this.DropDownChang}>{countriesOption}</select>
                        </td>
                        {
                          /* <td className = "col-md-3" style = {td}><button className="btn btn-secondary" onClick={() => this.handleAddToFavorite(data.id, data.title,data.uri,data.master_id, data.thumb)}
                                      className="button favorites-button">Add to Favorites</button></td> */                            
                          <td class="cell100 column6" ><input type = "checkbox" 
                                      onClick={() => this.handleAddToFavorite(data.id, data.title,data.uri,data.master_id, data.thumb)}/>
                          </td>          
                                      
                                      
                        }
                </div>)
              }
              </tr>
              
            </table>
              
          </h3>
        </div>
      </>)
  
  }
}
  
