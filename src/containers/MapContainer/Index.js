import React ,{Component} from 'react'
import {observer, inject} from 'mobx-react'
import {Map , MapCard} from '../../components'
import {Card} from 'material-ui/Card'
import {Paper} from 'material-ui'
import {FOOTER_HEIGHT, REFRESH_INTERVAL}  from '../../constants'
import $ from 'jquery'

const HOST = 'http://localhost' ;
const PORT = 3000 ;

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
    console.log('params')
    console.log(this.props.params)
    this.name = this.props.params.name
  }
  handleLocationMessage (data) {
    this.props.store.locationStore.setLocation(data.lat, data.lng,data.updatedAt)
  }
  componentWillMount () {

  }
  componentDidMount () {
    let locationInterval = 1000 * REFRESH_INTERVAL;
    setInterval(() => {
      this.serverRequest = $.get('/api/getFriendLocation/'+this.name, function (response) {
        // console.log('response')
        // console.log(response)
        this.handleLocationMessage({
          lat: response.lat,
          lng: response.lng,
          updatedAt : response.updatedAt
        })
      }.bind(this));
    }, locationInterval);
    setInterval(() => {
        navigator.geolocation.getCurrentPosition( (position) => {
          var {latitude,longitude} = position.coords;
          var {clientLocation} = this.props.store.locationStore;
          console.log('update client location')
          clientLocation.setLocation(latitude, longitude);
        });
      }, locationInterval);
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
