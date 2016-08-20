import React ,{Component} from 'react'
import {observer, inject, autorun} from 'mobx-react'
import io from 'socket.io-client'

const HOST = 'http://localhost' ;
const PORT = 3001 ;
const socket = io(HOST.concat(':',PORT))

@inject('store') @observer
class Locator extends Component {
  constructor () {
    super()
    this.handleLocationMessage = this.handleLocationMessage.bind(this)
    socket.on(`connection`, function (){
			console.log('Connection...')
    });
		socket.on(`location`, data => {
			console.log('Recv data...')
      this.handleLocationMessage (data);
      // console.log(this)
      // this.props.store.location.lat = data.lat;
      // this.props.store.location.lng = data.lng;
      // this.render();
    })
  }
  handleLocationMessage (data) {
    this.props.store.setLocation(data.lat, data.lng)
  }
  componentDidMount () {

  }
  render () {
    const {store} = this.props;
    console.log('..Location..')
    console.log(this.props)
    return (
        <div id='locator' style={{textAlign : 'center'}}>
          Just a locator :0
          <h1>{store.location.lat}</h1>
          <h1>{store.location.lng}</h1>
        </div>
    )
  }
}
export default Locator
