import React, { Component } from 'react'
import 'whatwg-fetch'
import Map from './Map.js'
import Blog from './Blog.js'
import Modal from './Modal.js'
import './App.css'

class App extends Component {
  constructor(){
    super()
    this.state={locationArray:[],response:false, class:'hidden'}
    this.openModal = this.openModal.bind(this)
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
      newState = Object.assign({},oldState,{class:"show",current:oldState.blogArray[index]})
    }else{
      newState = Object.assign({},oldState,{class:"hidden"})
    }
    this.setState(newState)
    console.log('hit');
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
        <Map locations={this.state.locationArray}/>
        <Blog toggleModal={this.openModal} blogs={this.state.blogArray}/>
      </div>
    );
  }
}

export default App;
