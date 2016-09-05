import React ,{Component} from 'react'
import {observer, inject} from 'mobx-react'
import {Locator} from '../../components'
import io from 'socket.io-client'
import $ from 'jquery'

const INTERVAL = 5000;

@inject('store') @observer
class LocatorContainer extends Component {
  constructor () {
    super()
    this.onRefreshClickHandler = this.onRefreshClickHandler.bind(this)
    this.sendLocation = this.sendLocation.bind(this)
    this.refreshLocation = this.refreshLocation.bind(this)
  }
  refreshLocation () {
    let myLocation = this.props.store.location;
    let cb = this.sendLocation;
    navigator.geolocation.getCurrentPosition( (position) => {
      var {latitude,longitude} = position.coords;
      myLocation.setLocation(latitude, longitude);
      let location = {
        lat : myLocation.lat,
        lng : myLocation.lng
      }
      cb(location);
    });
  }
  onRefreshClickHandler () {
    this.refreshLocation ()
  }
  sendLocation (location) {
    $.ajax
    ({
        type: "POST",
        url: '/api/setLocation',
        processData: false,
        contentType: 'application/json',
        data: JSON.stringify(location),
        success: function () {
          console.log("Successfully send location!");
        }
    })
  }
  componentDidMount () {
    setInterval(() => {
      console.log('Send location...');
      this.refreshLocation()
    }
    , INTERVAL);
  }

  render () {
    return (
      <Locator location={this.props.store.location} onRefreshClick={this.onRefreshClickHandler}/>
    );
  }
}
export default LocatorContainer
