import React, { Component } from 'react'
// import { Link } from 'react-router'
import {withRouter} from 'react-router'
import {APP_NAME} from '../../constants'
import { AppBar, IconButton, IconMenu, MenuItem, Drawer,FontIcon} from 'material-ui'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';
import ActionFace from 'material-ui/svg-icons/action/face';
import ActionHome from 'material-ui/svg-icons/action/home';
import MapPlace from 'material-ui/svg-icons/maps/place';

const style = {
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  height: '4em'
}
class Header extends Component {
  constructor (props) {
    super(props)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.state = {open: false};
    this.redirectHome = this.redirectHome.bind(this)
    this.redirectMap = this.redirectMap.bind(this)
  }
  redirectHome () {
    this.props.history.replace({pathname : '/home'})
    this.handleClose()
  }
  redirectMap () {
    this.props.history.replace({pathname : '/map'})
    this.handleClose()
  }
  handleToggle () {
    this.setState({open: !this.state.open});
  }
  handleClose () {
    console.log("close!!")
    this.setState({open: false});
  }
  render () {
    const iconLeft = (
      <IconButton onTouchTap={this.handleToggle}><NavigationMenu /></IconButton>
    )
    const iconRight = (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
      </IconMenu>
    )
    const menuAppIconLeft = (
      <IconButton onTouchTap={this.handleClose}><NavigationClose /></IconButton>
    )
    const MexenizLink = (
      <a href='https://github.com/mexeniz' >@mexeniz</a>
    )
    return (
      <div className='nav'>
        <AppBar
          title={APP_NAME}
          iconElementLeft={iconLeft}
          onLeftIconButtonTouchTap={this.handleToggle}
          />
          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
          > <AppBar
            title="Menu"
            iconElementLeft={menuAppIconLeft}
            onLeftIconButtonTouchTap={this.handleClose}
          />
            <MenuItem onTouchTap={this.redirectHome} leftIcon={<ActionHome />} >Home</MenuItem>
            <MenuItem onTouchTap={this.redirectMap} leftIcon={<MapPlace />} >Mma's Map</MenuItem>
            <MenuItem leftIcon={<ActionFace />} >@Mexeniz</MenuItem>
            <MenuItem leftIcon={<ActionFace />} >@Aunnnn</MenuItem>
          </Drawer>
      </div>
    )
  }
}

export default withRouter(Header)
