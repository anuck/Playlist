import React from 'react'

export default class Playlist extends React.Component{

    constructor(props){
        super(props);
        this.state = {
           playlistArray:[],
           categorylist:[],
           searchtext:''
          
        }
        
       // this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.handleDeleteFromFavorite = this.handleDeleteFromFavorite.bind(this)
    }
    componentDidMount() {
        const serverCategory='http://localhost:7558/listofplaylist'
        fetch(serverCategory,{method:'GET'})
        .then(response=>response.json())
        .then(data => {                    
            this.setState({
                playlistArray:data
            })
            console.log("listing category",this.state.playlistArray);
        })
    
    }

    handleDeleteFromFavorite(id) {
       
        fetch("http://localhost:7558/api/tracks/" + id, {
        method: "DELETE",
        })
        .then((res) => {
        if (res.status === 200) {
        let index = -1;
        let isFound = false;
        
        this.state.playlistArray.map((item) => {
        if (!isFound && id !== item.id) {
        index++;
        } else if (!isFound && id === item.id) {
        index++;
        isFound = true;
        }
        });
        let tempFavArray = this.state.playlistArray;
        if (isFound && index > -1) {
        tempFavArray.splice(index, 1);
        this.setState({ playlistArray: tempFavArray });
        }
        }
        return res.json();
        })
        .then((res) => console.log(res.status));
        alert("The track has been removed from favorites!");
        }

      
      searchClick(e)
      {
   
        const serverUrl = 'http://localhost:7558/serchByTitle/title=' +e.target.value
        //console.log(e.target.value);
       // alert(e.target.value);
        
        fetch(serverUrl, { method: 'GET' })
            .then(response => response.json())
            .then(response=>console.log(response))
            .then(data => {
                this.setState({ playlistArray: data.results })  
              })
       }
      
    render()
    {
        let styleImage={
            width : '100px',
            height:'100px'
          }
          

          let styleButton={
              width:'130px',
              height:'50px'
          }
          let td={
            width : '120px'
          }
        return(
            <>
               <div className = "wrapper">
               <div className="container pt-3 d-inline-flex navbar navbar-expand-sm">
              <form onSubmit={this.handleOnSubmit} className="form-inline">
                <div className = "searchEngine">
                <input type="text" className = "form-control mb-0 mr-sm-2 active md-form " name="search" placeholder="Search.." ref="search" onChange={this.searchClick} />
                  
                </div>
                <input type="submit" value="Submit" style={styleButton}></input>
                {/* { <button type="submit">Serach</button> } */}
              </form>
            </div>
             </div>
           
            
             <div className = "background">
              <h1>
                <table className = "table">
                  <tr>  
                    {this.state.playlistArray.map(data=>
                          <div className = "d-inline-flex p-3">
                            <td className = "col-md-3" style = {td}><img  src={data.thumb}  /></td>
                            
                            <td className = "col-md-3" style = {td}>{data.title}</td>
                            <td className = "col-md-3" style = {td}>{data.type}</td>
                            
                            <td className = "col-md-3" style = {td}><button className="btn btn-secondary" onClick={() => this.handleDeleteFromFavorite(data.id)}
                                         className="button favorites-button">Delete</button></td>
                    </div>)}
                  </tr>
                  
                </table>
                  
              </h1>
            </div>
                 <div>
                     
   
                 </div>
             
      </>
        )

    }

}