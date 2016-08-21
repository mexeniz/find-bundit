import React ,{Component} from 'react'
import {observer} from 'mobx-react'
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

const myMapStyle = {
  height : "500px",
  width : "auto",
  margin : "30px",
  align: "center"
};

@observer
class Map extends Component {

  // render () {
  //   const {location} = this.props;
  //   return (
  //       <div id='locator' style={{textAlign : 'center'}}>
  //         Just a map view
  //         <h1>{location.lat}</h1>
  //         <h1>{location.lng}</h1>
  //       </div>
  //   )
  // }
  render () {
  return (
    <div id='my-map' style={myMapStyle}>
      <section style={{height: "100%"}}>
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
              defaultZoom={3}
              defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
            >
            <Marker position={{lat: -25.363882, lng: 131.044922}} />
            </GoogleMap>
          }
        />
      </section>
    </div>
  );
}
}
export default Map
