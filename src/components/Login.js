import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {lightBlue50} from 'material-ui/styles/colors'
import {TextField, RaisedButton} from 'material-ui';
import $ from 'jquery'

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
  height: "100%"
}

const buttonStyle = {
  margin: 12
}
@inject('token') @observer
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.onLoginClick = this.onLoginClick.bind(this)
    this.onChange = this.onChange.bind(this)
    this.setToken = this.setToken.bind(this)
    this.state = this.getState()
  }
  getState () {
        return { username : '',
                password : ''};
  }
  setToken (token) {
    console.log(token);
    this.props.token = token ;
  }
  onLoginClick () {
    console.log('token= ' + this.props.token + 'username=' + this.state.username + ' password=' + this.state.password)
    var setToken = this.setToken
    $.ajax
    ({
        type: "POST",
        url: '/api/authenticate',
        processData: false,
        contentType: 'application/json',
        data: JSON.stringify(this.state),
        success: function (data) {
          console.log("Successfully authenticate");
          setToken(data.token)
        }
    })
  }
  onChange (event) {
      this.state[event.target.name] = event.target.value;
  }
  render() {
    // const {todoStore, viewStore} = this.props;
    console.log(this.props.token);
    return (
      <div className="container" id="home" style={style}>
        <div style={welcomeStyle}>
          <h1>Login</h1>
          <form>
            <TextField
              hintText="Username"
              floatingLabelText="Username"
              type="text"
              name="username"
              value={this.username}
              onChange={this.onChange}
            />
            <br/>
            <TextField
              hintText="Password"
              floatingLabelText="Password"
              type="password"
              name="password"
              value={this.password}
              onChange={this.onChange}
            />
            <br/>
            <RaisedButton
              label="Login"
              primary={true}
              onClick={this.onLoginClick}
              style={buttonStyle}
            />
          </form>
        </div>
      </div>
    )
  }

  componentDidMount() {}
}

Login.propTypes = {
};
