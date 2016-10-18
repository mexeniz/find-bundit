import React ,{Component} from 'react'
import {observer, inject} from 'mobx-react'
import {Map , MapCard} from '../../components'
import {Card} from 'material-ui/Card'
import {Paper} from 'material-ui'
import {FOOTER_HEIGHT, REFRESH_INTERVAL}  from '../../constants'
import $ from 'jquery'

const paperStyle = {
  padingTop: "14px",
  padingBottom: "14px",
  position: 'absolute',
  top: '4em', // 8em
  left: 0,
  bottom: FOOTER_HEIGHT, // 8em
  right: 0,
  overflow: 'auto'
}

@inject('store') @observer
class MapContainer extends Component {
  constructor (props) {
    super(props)
    this.handleLocationMessage = this.handleLocationMessage.bind(this)
    this.fetchUserProfile = this.fetchUserProfile.bind(this)
    if(this.props.params.name)
      this.friendUsername = this.props.params.name
    else
      this.friendUsername = 'mmarcl'
    this.setUserProfile = this.setUserProfile.bind(this)
    this.redirectToHome = this.redirectToHome.bind(this)
  }
  redirectToHome () {
    alert('User = '+this.friendUsername+' not found.')
    this.props.history.push('/home')
  }
  handleLocationMessage (data) {
    this.props.store.locationStore.setLocation(data.lat, data.lng,data.updatedAt, data.isActive)
  }
  setUserProfile (profile) {
    this.props.store.locationStore.location.setName(profile.name)
    this.props.store.locationStore.location.setPicture(profile.picture)
  }
  fetchUserProfile () {
    let setUserProfile = this.setUserProfile
    let redirectToHome = this.redirectToHome
    this.serverRequest = $.get('/api/getUserProfile/'+this.friendUsername, (response) => {
      setUserProfile(response.profile)
    });
    this.serverRequest.error(function(jqXHR, textStatus, errorThrown) {
      if (textStatus == 'timeout')
        console.log('The server is not responding');
      if (textStatus == 'error')
        console.log(errorThrown);
      redirectToHome()
    });
  }
  componentWillMount () {

  }
  componentDidMount () {
    let locationInterval = 1000 * REFRESH_INTERVAL;
    // get client location
    navigator.geolocation.getCurrentPosition( (position) => {
      var {latitude,longitude} = position.coords;
      var {clientLocation} = this.props.store.locationStore;
      clientLocation.setLocation(latitude, longitude);
    });
    // automatically get client locaiton
    setInterval(() => {
        navigator.geolocation.getCurrentPosition( (position) => {
          var {latitude,longitude} = position.coords;
          var {clientLocation} = this.props.store.locationStore;
          clientLocation.setLocation(latitude, longitude);
        });
      }, locationInterval);
    // get first location from host
    let handleLocationMessage = this.handleLocationMessage
    this.serverRequest = $.get('/api/getFriendLocation/'+this.friendUsername, (response) => {
      handleLocationMessage({
        lat: response.lat,
        lng: response.lng,
        updatedAt : response.updatedAt,
        isActive : response.isActive
      })
    });
    // automatically get locaiton
    setInterval(() => {
      this.serverRequest = $.get('/api/getFriendLocation/'+this.friendUsername, (response) => {
        handleLocationMessage({
          lat: response.lat,
          lng: response.lng,
          updatedAt : response.updatedAt,
          isActive : response.isActive
        })
      })
    }, locationInterval);
    this.fetchUserProfile();
  }

  render () {
    return (
      <Paper zDepth={2} style={paperStyle}>
        <MapCard location={this.props.store.locationStore.location} />
        <Map location={this.props.store.locationStore.location} clientLocation={this.props.store.locationStore.clientLocation}/>
      </Paper>
    );
  }
}
export default MapContainer
