import React ,{Component, PropTypes} from 'react'
import {TextField, RaisedButton} from 'material-ui';
import {observer} from 'mobx-react'

@observer
class Locator extends Component {
  constructor(props) {
    super(props);
    this.onSubmitHandle = this.onSubmitHandle.bind(this)
    this.onLatChangeHandle = this.onLatChangeHandle.bind(this)
    this.onLngChangeHandle = this.onLngChangeHandle.bind(this)
    }
  onSubmitHandle () {
    this.props.onLocationSubmit(this.props.location.lat,this.props.location.lng)
    //return false;
  }
  onLatChangeHandle (event) {
    this.props.location.setLat(event.target.value)
  }
  onLngChangeHandle (event) {
    this.props.location.setLng(event.target.value)
  }
  render () {
    return (
        <div id='locator' style={{textAlign : 'center'}}>
          Just a locator :0

          <form>
            <TextField
              name="lat"
              hintText="Latitude"
              value={this.props.location.lat}
              onChange={this.onLatChangeHandle}
            /><br />
            <br />
            <TextField
              name="lng"
              hintText="Longitude"
              value={this.props.location.lng}
              onChange={this.onLngChangeHandle}
            /><br />
            <br />
            <RaisedButton label="Submit" onClick={this.onSubmitHandle}  primary={true} style={{margin : "12px"}} />
          </form>
        </div>
    )
  }
}
Locator.propTypes = {
  onChange: PropTypes.func.isRequired,
  onLocationSubmit: PropTypes.func.isRequired
}
export default Locator
