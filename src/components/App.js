import React, { Component } from 'react'
import 'whatwg-fetch'
import Map from './Map.js'
import Blog from './Blog.js'
import Modal from './Modal.js'
import './App.css'
import loading from '../gears.svg'
import * as helperObj from '../lib/helpers.js'


class App extends Component {
  constructor(){
    super()
    this.state={locationArray:[],response:false, class:'hidden'}
    this.openModal = this.openModal.bind(this)
  }
  componentDidMount() {
    fetch('https://serene-brook-99802.herokuapp.com/blogs')
    //fetch('http://localhost:3000/blogs')
    .then((response)=>{
      return response.json()
    })
    .then((response)=>{
      return helperObj.default.orderObject(response)
    })
    .then((response)=>{
      const giantObj = helperObj.default.createObjById(response)
      const locationArray = helperObj.default.createLocationArray(response)

      this.setState({
        locationArray:locationArray,
        giantObj:giantObj,
        response:true,
        class:"hidden",
        current:"N/A"
      })
    })
  }

  openModal(index){
    const oldState = this.state
    let newState
    if(oldState.class === 'hidden'){
      newState = Object.assign({},oldState,{class:"show",current:oldState.giantObj[index]})
    }else{
      newState = Object.assign({},oldState,{class:"hidden"})
    }
    this.setState(newState)
  }

  render() {
    if(!this.state.response){
      return <div className="loadingGears">
        <img src={loading} alt="Loading Gears"/>
        <h2>Waiting for Heroku to wake up</h2>
      </div>
    }
    let coverClass = "cover "+this.state.class
    let modalClass = "modal "+this.state.class
    return (
      <div className="App">
        <div className="header">
          <div className="inner">
            <h3>Code Road Trip</h3>
          </div>
        </div>
        <div className={coverClass} onClick={this.openModal}></div>
        <Modal className={modalClass} current={this.state.current}/>
        <Map toggleModal={this.openModal} giantObj={this.state.giantObj}/>
        <Blog toggleModal={this.openModal} giantObj={this.state.giantObj}/>
      </div>
    );
  }
}

export default App;
