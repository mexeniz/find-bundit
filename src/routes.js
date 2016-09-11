import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import {
  App,
  Home,
  Login
} from './components'
import {LocatorContainer,MapContainer} from './containers'

var storage = {
  token :''
};

function requireAuth(nextState, replace) {
  if (storage.token == '') {
    replace({
      pathname: '/login',
    })
  }
}

export default () => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={App} storage={storage}>
        <IndexRoute component={Home} />
        <Route path='home' component={Home} />
        <Route path='locator' component={LocatorContainer} onEnter={requireAuth} />
        <Route path='map' component={MapContainer} />
        <Route path='login' component={Login} />
      </Route>
    </Router>
  )
}
