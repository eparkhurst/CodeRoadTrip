import React, { Component } from 'react'
import 'whatwg-fetch'
import Map from './Map.js'
import Blog from './Blog.js'
import Modal from './Modal.js'
import './App.css'
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
      return response.sort((a,b)=>{
        if(a.id == null) a.id = 0
        return ((a.id < b.id) ? -1 : ((a.id > b.id) ? 1 : 0));
      })
    })
    .then((response)=>{
      const giantObj = helperObj.default.createObjById(response)
      console.log(giantObj);
      console.log(response);
      const locationArray = response.filter((e)=>{
        return e.location
      }).map((e)=>{
        return e.location
      })
      const blogArray = response.map((e)=>{
        return{title:e.title,text:e.text}
      }).reverse()
      this.setState({
        locationArray:locationArray,
        giantObj:giantObj,
        blogArray:blogArray,
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
      return <div>Not Mounted</div>
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
