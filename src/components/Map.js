import React, { Component } from 'react';
import GoogleMapsLoader from 'google-maps'
import './Map.css'

class Map extends Component{
  componentDidMount(){

    function createWaypoints(array){
      const newArray = array.concat([])
      newArray.shift()
      newArray.pop()
      return newArray.map((e)=>{
        return {location:e,stopover:true}
      })
    }

    const keys = Object.keys(this.props.giantObj)
    const locationsArray = keys.reduce((p,c)=>{
      p.push(this.props.giantObj[c])
      return p
    },[]).filter((e)=>{
      return e.location
    }).map((e)=>{
      return e.location
    })

    const blogs  = keys.reduce((p,c)=>{
      p.push(this.props.giantObj[c])
      return p
    },[])

    const toggleModal = this.props.toggleModal

    GoogleMapsLoader.KEY = 'AIzaSyDiwAmvLRL_fSRPtIMIQ2OdX13wHNDTBFI'
    GoogleMapsLoader.load(function(google) {
      let directionsDisplay;
      const directionsService = new google.maps.DirectionsService();
      directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true});
      const dessert = {lat:33.4484,lng: -112.0740};
      const map = new google.maps.Map(document.getElementById('map'),{
        zoom: 6,
        center: dessert,
        mapTypeId: 'hybrid',
        mapTypeControl: false,
      });
      const image = new google.maps.MarkerImage(
        './speechBubble.png',
        null,
        null,
        new google.maps.Point(0, 25),
        new google.maps.Size(30, 30)
      )

      blogs.map(function(blog, i){
        if (blog.text) {
          return new google.maps.Marker({
            position: blog.location,
            icon:image,
            map:map
          }).addListener('click', function(){
            toggleModal(blog.id)
          })
        }
      });
      directionsDisplay.setMap(map);
      const request = {
        origin: locationsArray[0],
        destination:  locationsArray[locationsArray.length -1] ,
        waypoints:createWaypoints(locationsArray),
        travelMode: 'DRIVING'
      };

      directionsService.route(request, function(result, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(result);
        }
      });
    });
  }
  render(){
    return <div id="map">
      <h1>Map Section</h1>
    </div>
  }
}

export default Map
