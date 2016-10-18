import React ,{Component} from 'react'
import {observer} from 'mobx-react'
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import ActionEvent from 'material-ui/svg-icons/action/event';
import {blue300, indigo900} from 'material-ui/styles/colors';
import SvgIconSchedule from 'material-ui/svg-icons/action/schedule';
import DeviceGpsFixed from 'material-ui/svg-icons/device/gps-fixed';
import DeviceGpsNotFixed from 'material-ui/svg-icons/device/gps-not-fixed';
import DeviceGpsOff from 'material-ui/svg-icons/device/gps-off';
import {REFRESH_INTERVAL} from '../constants'

// compose picture path
var pathArray = location.href.split( '/' );
var protocol = pathArray[0];
var host = pathArray[2];
var baseUrl = protocol + '//' + host;

const style = {
  margin: "14px"
}

@observer
class MapCard extends Component {

  constructor (props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }
  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };
  handleExpand = () => {
    this.setState({expanded: !this.state.expanded});
  };
  render () {
    /*
    <TableBody displayRowCheckbox={false}>
      <TableRow>
       <TableRowColumn>3/10/2559</TableRowColumn>
        <TableRowColumn>1st Rehearsal Day</TableRowColumn>
        <TableRowColumn>N/A</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>8/10/2559</TableRowColumn>
        <TableRowColumn>2nd Rehearsal Day</TableRowColumn>
        <TableRowColumn>8.00 AM - 11.00 AM</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>20/10/2559</TableRowColumn>
        <TableRowColumn>Commencement Day</TableRowColumn>
        <TableRowColumn>1.00 PM - 6.00 PM</TableRowColumn>
      </TableRow>
    </TableBody>
     */

    var avatarPath;
    if (this.props.location.picture.includes("http://") || this.props.location.picture.includes("https://") ){
      avatarPath = this.props.location.picture
    }
    else {
      avatarPath = baseUrl + this.props.location.picture
    }
    const schedule = (
      <Table>
      <TableHeader
          selectable={false}
          displaySelectAll={false}
          adjustForCheckbox={false}
          >
        <TableRow>
          <TableHeaderColumn>Date</TableHeaderColumn>
          <TableHeaderColumn>Event</TableHeaderColumn>
          <TableHeaderColumn>Photo session</TableHeaderColumn>
        </TableRow>
      </TableHeader>
    </Table>
    );
    var lastUpdated = 'N/A'
    if(this.props.location.updatedAt != null){
      lastUpdated = this.props.location.updatedAt
    }
    const titleText = this.props.location.name+'\'s location'
    const subtitleText = 'My location refreshes every ' + REFRESH_INTERVAL+ ' sec.'

    // compose status Chip
    var status = 'N/A'
    var statusBGColor = '#9E9E9E'
    var statusColor = '#F5F5F5'
    var statusIcon = <DeviceGpsNotFixed />
    if (this.props.location.isActive != null){
      if (this.props.location.isActive){
        // host is sill updating location
        status = 'Active'
        statusBGColor = '#4CAF50'
        statusColor = '#C8E6C9'
        statusIcon = <DeviceGpsFixed />
      }else{
        // host is not updating location anymore...
        status = 'Inactive'
        statusBGColor = '#FF5722'
        statusColor = '#FFCCBC'
        statusIcon = <DeviceGpsOff />
      }
    }

    return (
      <Card style={style} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          avatar= {avatarPath}
          title={titleText}
          subtitle={subtitleText}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardActions>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Chip
            backgroundColor={statusColor}
            style={{margin:4}}
          >
            <Avatar size={32} color={statusColor} backgroundColor={statusBGColor} icon={statusIcon} />
            Status: {status}
          </Chip>
          <Chip
            backgroundColor={blue300}
            style={{margin:4}}
          >
            <Avatar size={32} color={blue300} backgroundColor={indigo900} icon={<SvgIconSchedule />} />
            Last Update: {lastUpdated} ago
          </Chip>
        </div>
        <RaisedButton
            label="Schedule"
            primary={true}
            onTouchTap={this.handleExpand}
            icon={<ActionEvent />}
            style={{margin:"12px"}}
          />
        </CardActions>
        <CardText expandable={true}>
        </CardText>
      </Card>
    )
  }
}
export default MapCard
