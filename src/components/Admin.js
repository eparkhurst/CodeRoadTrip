import React , {Component} from 'react'
import 'whatwg-fetch'
import { browserHistory,Link } from 'react-router';
import './Admin.css'

class Admin extends Component{
  constructor(){
    super()
    this.state = {locationChecked:"hidden"}
    this.sendData = this.sendData.bind(this)
    this.getLocation = this.getLocation.bind(this)
    this.showPosition = this.showPosition.bind(this)
    this.changeLocationEntryType = this.changeLocationEntryType.bind(this)
  }
  sendData(loc){
    fetch('http://localhost:3000/locations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: this.refs.title.value,
        text: this.refs.text.value,
        location:loc
      })
    }).then(()=>{
      browserHistory.push('/');
    })
  }
  getLocation(event) {
    event.preventDefault()
    if(this.state.locationChecked === "show"){
      this.sendData({lat:Number(this.refs.lat.value),lng:Number(this.refs.lng.value)})
    }else{
     if (navigator.geolocation) {
          return navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
          console.log("Geolocation is not supported by this browser.")
      }
    }
  }

  showPosition(position) {
    const loc = {lat:position.coords.latitude, lng:position.coords.longitude}
    this.sendData(loc)
  }

  changeLocationEntryType(event){
    console.log(this.state.locationChecked);
    if(this.state.locationChecked === "hidden"){
      const newState  = Object.assign({},this.state, {locationChecked:"show"})
      this.setState(newState)
    }else{
      const newState  = Object.assign({},this.state, {locationChecked:"hidden"})
      this.setState(newState)
    }
  }

  render(){
    let locationChecked =  this.state.locationChecked
    return <div className="admin">
      <form onSubmit={this.getLocation}>
        <label className="titleLabel">Title</label>
        <input className="title" type="text" ref="title"/>
        <label className="textLabel" >Text</label>
        <textarea ref="text"/>
        <label>
          Add Custom Location
          <input onClick={this.changeLocationEntryType} type="checkbox" ref="locationType"/>
        </label>
        <div className={locationChecked}>
          <label>Latitude</label>
          <input type="text" ref="lat"/>
          <label>Longitude</label>
          <input type="text" ref="lng"/>
        </div>
        <button className="submitButton" type="submit">Add Blog</button>
      </form>
      <Link className="backButton" to="/">Back to Map</Link>
    </div>
  }
}

export default Admin
