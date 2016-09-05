import React ,{Component} from 'react'
import {observer} from 'mobx-react'
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";
import {Card} from 'material-ui/Card';

const myMapStyle = {
  margin : "14px",
  align: "center",
  height: "100%"
};

@observer
class Map extends Component {

  render () {
  const {lat, lng} = this.props.location
  console.log('lat lng...');
  console.log(lat);
  console.log(lng);
  return (
    <div id='my-map' style={myMapStyle}>
      <div style={{height: '100%', width: "100%" }}>
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
            defaultZoom={19}
              center={{ lat: lat, lng: lng }}
            >
            <Marker position={{lat: lat, lng: lng}} />
            </GoogleMap>
          }
        />
      </div>
    </div>
  );
}
}
export default Map
