import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {lightBlue50} from 'material-ui/styles/colors'
import {TextField, RaisedButton} from 'material-ui';

const style = {
  textAlign: 'center',
  position: 'absolute',
  height: '100%',
  width: '100%'
}

const welcomeStyle = {
  fontSize: '24px',
  backgroundColor: lightBlue50,
  padding: '124px 24px 24px 24px',
  boxSizing: 'border-box',
  textAlign: 'center',
  height:"100%"
}

const buttonStyle = {
  margin: 12
}
@observer
export default class Login extends Component {
  render() {
    // const {todoStore, viewStore} = this.props;
    return (
      <div className="container" id="home" style={style}>
        <div style={welcomeStyle}>
          <h1>Login</h1>
          <form>
            <TextField hintText="Username" floatingLabelText="Username" type="text"/>
            <br/>
            <TextField hintText="Password" floatingLabelText="Password" type="password"/>
            <br/>
            <RaisedButton label="Login" primary={true} style={buttonStyle}/>
          </form>
        </div>
      </div>
    )
  }

  componentDidMount() {}
}

Login.propTypes = {};
