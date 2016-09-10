import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import {
  App,
  Home,
  Login
} from './components'
import {LocatorContainer,MapContainer} from './containers'

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
    })
  }
}

export default () => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='home' component={Home} />
        <Route path='locator' component={LocatorContainer} onEnter={requireAuth} />
        <Route path='map' component={MapContainer} />
        <Route path='login' component={Login} />
      </Route>
    </Router>
  )
}
