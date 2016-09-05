import React ,{Component} from 'react'
import {observer} from 'mobx-react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {FlatButton} from 'material-ui';

const style = {
  margin: "14px"
}

@observer
class MapCard extends Component {

  render () {
    return (
      <Card style={style}>
        <CardHeader
          title="Check my location from below map :)"
          subtitle="My location refresh every 5 second"
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
    )
  }
}
export default MapCard
