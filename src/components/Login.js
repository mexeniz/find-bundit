import React, {Component, PropTypes} from 'react';
import {withRouter} from 'react-router'
import {inject, observer} from 'mobx-react';
import {lightBlue50} from 'material-ui/styles/colors'
import {TextField, RaisedButton} from 'material-ui';
import jwtStore from 'react-jwt-store'
import {FOOTER_HEIGHT}  from '../constants'
import $ from 'jquery'

// const style = {
//   textAlign: 'center',
//   height: '4em',
//   width: '100%'
// }
const style = {
	textAlign : 'center',
	position:'absolute',
	height: 'auto',
	top: '4em',
	bottom: FOOTER_HEIGHT,
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
@observer
class Login extends Component {
  constructor(props) {
    super(props)
    this.onLoginClick = this.onLoginClick.bind(this)
    this.onChange = this.onChange.bind(this)
    this.changeRoute = this.changeRoute.bind(this)
    this.state = this.getState()
    this.userStore = this.props.route.storage
  }
  getState () {
        return { username : '',
                password : ''};
  }
  changeRoute (token) {
    alert('Login successfully...')
    this.userStore.setToken(token)
    this.props.history.replace({pathname : '/locator'})
  }
  onLoginClick () {
    console.log('token= ' + this.props.token + 'username=' + this.state.username + ' password=' + this.state.password)
    var changeRoute = this.changeRoute
    var data = {
      username : this.state.username,
      password : this.state.passwrd
    }

    $.ajax
    ({
        type: "POST",
        url: '/api/authenticate',
        processData: false,
        contentType: 'application/json',
        data: JSON.stringify(this.state),
        success: function (data) {
          console.log(data)
          if (data.token){
            console.log("Successfully authenticate");
            changeRoute(data.token)
          }
        }
    })
  }
  onChange (event) {
      this.state[event.target.name] = event.target.value;
  }
  render() {
    // const {todoStore, viewStore} = this.props;
    console.log('login token =' + this.userStore.getToken());
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

  componentDidMount () {

  }

}


export default withRouter(Login)
