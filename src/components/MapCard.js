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
import {REFRESH_INTERVAL} from '../../constatns'

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
    </Table>
    );
    var lastUpdated = 'Unknown'
    console.log('last updated')
    console.log(this.props.location.updatedAt)
    if(this.props.location.updatedAt != null){
      lastUpdated = this.props.location.updatedAt
    }
    return (
      <Card style={style} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          avatar="image/bundit-face.jpg"
          title="Check my location from the map below. :)"
          subtitle="My location refreshes every "+REFRESH_INTERVAL+" sec."
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardActions>
        <Chip
          backgroundColor={blue300}
          style={{margin:4}}
        >
          <Avatar size={32} color={blue300} backgroundColor={indigo900} icon={<SvgIconSchedule />} />
          Last Update: {lastUpdated} ago
        </Chip>
        <RaisedButton
            label="Schedule"
            primary={true}
            onTouchTap={this.handleExpand}
            icon={<ActionEvent />}
            style={{margin:"12px"}}
          />
        </CardActions>
        <CardText expandable={true}>
          {schedule}
        </CardText>
      </Card>
    )
  }
}
export default MapCard

// <Chip
//   backgroundColor={blue300}
//   style={{margin:4}}
// >
//   <Avatar size={32} color={blue300} backgroundColor={indigo900} icon={<SvgIconSchedule />} />
//   Last Update: {lastUpdated}
// </Chip>
