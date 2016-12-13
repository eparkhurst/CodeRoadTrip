import React , {Component} from 'react'
import 'whatwg-fetch'
import { browserHistory,Link } from 'react-router';
import './Admin.css'

class Admin extends Component{
  constructor(){
    super()
    this.sendData = this.sendData.bind(this)
    this.getLocation = this.getLocation.bind(this)
    this.showPosition = this.showPosition.bind(this)
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
    if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.")
    }
  }

  showPosition(position) {
    const loc = {lat:position.coords.latitude, lng:position.coords.longitude}
    this.sendData(loc)
  }

  render(){
    return <div>
      <form onSubmit={this.getLocation}>
        <label>Title</label>
        <input className="title" type="text" ref="title"/>
        <label>Text</label>
        <textarea ref="text"/>
        <button type="submit">Add Blog</button>
        <label>
          Add Location
          <input type="checkbox" name="locationType"/>
        </label>
      </form>
      <Link to="/">Back to Map</Link>
    </div>
  }
}

export default Admin
