import React ,{Component} from 'react'
import {observer, inject} from 'mobx-react'
import {Locator} from '../../components'
import $ from 'jquery'

const INTERVAL = 5000;

@inject('store') @observer
class LocatorContainer extends Component {
  constructor (props) {
    super(props)
    this.onRefreshClickHandler = this.onRefreshClickHandler.bind(this)
    this.sendLocation = this.sendLocation.bind(this)
    this.refreshLocation = this.refreshLocation.bind(this)
    this.userStore = this.props.route.storage;
  }
  refreshLocation () {
    let myLocation = this.props.store.locationStore.location;
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
    // add token to request body
    let data = Object.assign({}, {token : this.userStore.getToken()} , location)
    let name = this.props.store.locationStore.clientLocation.name
    $.ajax
    ({
        type: "POST",
        url: '/api/updateMyLocation/',
        processData: false,
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (data) {
          console.log(data)
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
      <Locator location={this.props.store.locationStore.location} onRefreshClick={this.onRefreshClickHandler}/>
    );
  }
}
export default LocatorContainer
