import React, { Component } from 'react'
import 'whatwg-fetch'
import Map from './Map.js'
import Blog from './Blog.js'
import './App.css'

class App extends Component {
  constructor(){
    super()
    this.state={locationArray:[],response:false}
  }
  componentDidMount() {
    fetch('http://localhost:3000/')
    .then((response)=>{
      return response.json()
    })
    .then((response)=>{
      const locationArray = response.map((e)=>{
        return e.location
      })
      const blogArray = response.map((e)=>{
        return{title:e.title,text:e.text}
      })
      console.log('in App',blogArray);
      this.setState({
        locationArray:locationArray,
        blogArray:blogArray,
        response:true
      })
    })
  }
  openModal(index){
    
  }
  render() {
    if(!this.state.response){
      console.log("hit");
      return <div>Not Mounted</div>
    }
    return (
      <div className="App">
        <div className="header">
          <div className="inner">
            <h3>Code Road Trip</h3>
          </div>
        </div>
        <Map locations={this.state.locationArray}/>
        <Blog blogs={this.state.blogArray}/>
      </div>
    );
  }
}

export default App;
