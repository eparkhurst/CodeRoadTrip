import React, { Component } from 'react';
import GoogleMapsLoader from 'google-maps'
import './Map.css'

class Map extends Component{
  componentDidMount(){
    function createWaypoints(array){
      var newArray = array.concat([])
      newArray.shift()
      newArray.pop()
      return newArray.map((e)=>{
        return {location:e,stopover:true}
      })
    }

    const locationsArray = this.props.locations
    console.log(locationsArray);
    GoogleMapsLoader.KEY = 'AIzaSyDiwAmvLRL_fSRPtIMIQ2OdX13wHNDTBFI'
    GoogleMapsLoader.load(function(google) {

      var directionsDisplay;
      var directionsService = new google.maps.DirectionsService();
      directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true});
      const dessert = {lat:33.4484,lng: -112.0740};
      const map = new google.maps.Map(document.getElementById('map'),{
        zoom: 6,
        center: dessert,
        mapTypeId: 'hybrid',
        mapTypeControl: false,
      });

      directionsDisplay.setMap(map);

      var request = {
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
    console.log(this.props);
    return <div id="map">
      <h1>Map Section</h1>
    </div>
  }
}

export default Map
