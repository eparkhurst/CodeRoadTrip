import React, { Component } from 'react'
import 'whatwg-fetch'
import Map from './Map.js'
import Blog from './Blog.js'
import './App.css'

class App extends Component {
  componentDidMount() {
    fetch('http://localhost:3000/')
    .then((response)=>{
      return response.json()
    })
    .then((response)=>{
      console.log(response)
    })


  }
  render() {
    return (
      <div className="App">
        <Map />
        <Blog />
      </div>
    );
  }
}

export default App;
