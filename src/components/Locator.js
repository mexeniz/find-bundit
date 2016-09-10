import React ,{Component, PropTypes} from 'react'
import {TextField, RaisedButton, Toggle} from 'material-ui';
import {observer} from 'mobx-react'

@observer
class Locator extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
        <div id='locator' style={{textAlign : 'center'}}>
          Just a locator :0
          <Toggle label="Auto refresh" defaultToggled={true}/>
          <h1>Latitude = {this.props.location.lat.toPrecision(9)}</h1>
          <h1>Longitude = {this.props.location.lng.toPrecision(9)}</h1>
          <RaisedButton label="Refresh" onClick={this.props.onRefreshClick}  primary={true} style={{margin : "12px"}} />
        </div>
    )
  }
}

Locator.propTypes = {
  onRefreshClick : PropTypes.func.isRequired
}
export default Locator
