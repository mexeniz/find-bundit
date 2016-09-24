import React ,{Component} from 'react'
import {observer} from 'mobx-react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import ActionEvent from 'material-ui/svg-icons/action/event';

const style = {
  margin: "14px"
}

@observer
class MapCard extends Component {

  constructor () {
    super();
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
    return (
      <Card style={style} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          avatar="image/bundit-face.jpg"
          title="Check my location from below map :)"
          subtitle="My location refresh every 5 second"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardActions>
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
