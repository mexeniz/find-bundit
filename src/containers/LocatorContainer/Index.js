import React ,{Component} from 'react'
import {observer, inject} from 'mobx-react'
import {Locator} from '../../components'
import io from 'socket.io-client'

const HOST = 'http://localhost' ;
const PORT = 3001 ;
const socket = io(HOST.concat(':',PORT))

@inject('store') @observer
class LocatorContainer extends Component {
  constructor () {
    super()
    this.onLocationSubmitHandler = this.onLocationSubmitHandler.bind(this)
    this.onChange = this.onChange.bind(this)
    socket.on(`connection`, function (){
			console.log('Connection...')
    });
		// socket.on(`locat
  }
  onChange (event) {
    // this.updateProperty(event.target.name, event.target.value)
  }
  onLocationSubmitHandler (lat, lng) {
    console.log("Submit")
    console.log(lat + ' : ' + lng)
    let location = {
      lat : lat,
      lng : lng
    }
    socket.emit('update location',location)
  }
  // sendLocationMessage (data) {
  //   //this.props.store.setLocation(data.lat, data.lng)
  // }
  componentDidMount () {

  }

  render () {
    return (
      <Locator location={this.props.store.location} onChange={this.onChange} onLocationSubmit={this.onLocationSubmitHandler}/>
    );
  }
}
export default LocatorContainer
