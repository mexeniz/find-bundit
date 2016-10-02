import React ,{Component} from 'react'
import {observer} from 'mobx-react'
import {GoogleMapLoader, Circle, GoogleMap, Marker} from "react-google-maps";
import {Card} from 'material-ui/Card';
import {DEFAULT_ZOOM}  from '../constants'

// compose marker path
var pathArray = location.href.split( '/' );
var protocol = pathArray[0];
var host = pathArray[2];
var baseUrl = protocol + '//' + host;
const markerIconPath = baseUrl + '/image/salmon-marker.png'
const clientIconPath = baseUrl + '/image/geolocation_marker.png'

const myMapStyle = {
  margin : "14px",
  align: "center",
  height: "70%",
  overflow: "auto"
};

@observer
class Map extends Component {
  // center={{lat: parseFloat(clientLat), lng: parseFloat(clientLng)}}

  render () {
  const {lat, lng} = this.props.location
  const clientLat = this.props.clientLocation.lat
  const clientLng = this.props.clientLocation.lng
  console.log('bundit= ' +lat + ' ' + lng)
  console.log('client= ' +clientLat + ' ' + clientLng)

  let contents = [];
  if (lat >= 0 && lng >= 0){
    contents = contents.concat((
      <Marker
        key="bundit"
        zIndex={5}
        position={{lat: lat, lng: lng}}
        icon= {markerIconPath}
      />))

      if (clientLat >= 0 && clientLng >= 0){
        contents = contents.concat((
          <Marker
            key="client"
            zIndex={2}
            position={{lat: clientLat, lng: clientLng}}
            icon= {clientIconPath}
          />))
      }
  }
  return (
    <div id='my-map' style={myMapStyle}>
      <GoogleMapLoader
        containerElement={
          <div
            style={{
              height: "100%",
            }}
          />
        }
        googleMapElement={
          <GoogleMap
          defaultZoom={DEFAULT_ZOOM}
            center={{ lat: lat, lng: lng }}
          >
          {contents}
          </GoogleMap>
        }
      />
    </div>
  );
}
}
export default Map
