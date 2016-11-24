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
      this.setState({locationArray:response,response:true})
    })
  }
  render() {
    if(!this.state.response){
      console.log("hit");
      return <div>Not Mounted</div>
    }
    return (
      <div className="App">
        <Map locations={this.state.locationArray}/>
        <Blog />
      </div>
    );
  }
}

export default App;
