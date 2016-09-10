import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import {
  App,
  Home,
  Login
} from './components'
import {LocatorContainer,MapContainer} from './containers'

export default () => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='home' component={Home} />
        <Route path='locator' component={LocatorContainer} />
        <Route path='map' component={MapContainer} />
        <Route path='login' component={Login} />
      </Route>
    </Router>
  )
}
