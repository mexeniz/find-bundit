import React ,{Component} from 'react'
import {observer, inject} from 'mobx-react'
import {Map} from '../../components'
import io from 'socket.io-client'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Paper} from 'material-ui'
import FlatButton from 'material-ui/FlatButton';

const HOST = 'http://localhost' ;
const PORT = 3001 ;
const socket = io(HOST.concat(':',PORT))

@inject('store') @observer
class MapContainer extends Component {
  constructor () {
    super()
    this.handleLocationMessage = this.handleLocationMessage.bind(this)
    socket.on(`connection`, function (){
			console.log('Connection...')
    });
		socket.on(`location`, data => {
      this.handleLocationMessage (data);
    })
  }
  handleLocationMessage (data) {
    this.props.store.setLocation(data.lat, data.lng)
  }
  componentDidMount () {

  }

  render () {
    return (
      <Paper zDepth={2}>
        <Card>
          <CardHeader
            title="Without Avatar"
            subtitle="Subtitle"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardActions>
            <FlatButton label="Action1" />
            <FlatButton label="Action2" />
          </CardActions>
          <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
        </Card>
        <Card>
          <Map location={this.props.store.location}/>
        </Card>
      </Paper>
    );
  }
}
export default MapContainer
