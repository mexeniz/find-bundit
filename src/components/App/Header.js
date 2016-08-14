import React, { Component } from 'react'
// import { Link } from 'react-router'
import {APP_NAME} from '../../constants'
import { AppBar, IconButton, IconMenu, MenuItem } from 'material-ui'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

export default class Header extends Component {
  constructor () {
    super()
    this.handleNavMenuTap = this.handleNavMenuTap.bind(this)
  }
  handleNavMenuTap () {
    console.log('Nav Menu Tapped!')
  }
  render () {
    const iconLeft = (
      <IconButton onTouchTap={this.handleNavMenuTap}><NavigationMenu /></IconButton>
    )
    const iconRight = (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText='Refresh' />
        <MenuItem primaryText='About Us' />
        <MenuItem primaryText='Help' />
      </IconMenu>
    )
    return (
      <div className='nav'>
        <AppBar
          title={APP_NAME}
          iconElementLeft={iconLeft}
          iconElementRight={iconRight}
          />
      </div>
    )
  }
}
