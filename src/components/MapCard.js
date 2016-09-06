import React ,{Component} from 'react'
import {observer} from 'mobx-react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';

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
          <TableHeaderColumn>No.</TableHeaderColumn>
          <TableHeaderColumn>Event</TableHeaderColumn>
          <TableHeaderColumn>Date</TableHeaderColumn>
          <TableHeaderColumn>Photography Time</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        <TableRow>
          <TableRowColumn>1</TableRowColumn>
          <TableRowColumn>ถ่ายรูปนอกรอบ</TableRowColumn>
          <TableRowColumn>18/9/2559</TableRowColumn>
          <TableRowColumn>8.00 AM - 6.00 PM</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>2</TableRowColumn>
          <TableRowColumn>ซ้อมรับปริญญาครั้งที่ 1</TableRowColumn>
          <TableRowColumn>3/10/2559</TableRowColumn>
          <TableRowColumn>N/A</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>3</TableRowColumn>
          <TableRowColumn>ซ้อมรับปริญญาครั้งที่ 2</TableRowColumn>
          <TableRowColumn>8/10/2559</TableRowColumn>
          <TableRowColumn>8.00 AM - 11.00 AM</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>4</TableRowColumn>
          <TableRowColumn>พิธีพระราชทานปริญญาบัตร</TableRowColumn>
          <TableRowColumn>20/10/2559</TableRowColumn>
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
            labelPosition="before"
            primary={true}
            onTouchTap={this.handleExpand}
            icon={<ActionAndroid />}
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
