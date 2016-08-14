import React, { Component } from 'react'
import routes from '../routes'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {deepOrange500, tealA700} from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: tealA700,
    accent1Color: deepOrange500
  }
})

class Root extends Component {
  render () {
    injectTapEventPlugin()
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        {routes()}
      </MuiThemeProvider>
    )
  }
}

export default Root
