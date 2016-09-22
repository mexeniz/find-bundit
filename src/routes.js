import React from 'react'
import { RouterContext,Router, Route, IndexRoute, browserHistory } from 'react-router'
import {
  App,
  Home,
  Login
} from './components'
import {LocatorContainer,MapContainer} from './containers'
import jwtStore from 'react-jwt-store'


export default () => {
  var userStore = jwtStore();
  console.log(userStore)
  function requireAuth(nextState, replace) {
    console.log('current token = ' + userStore.getToken())
    if (!userStore.getToken()) {
      replace({
        pathname: '/login',
      })
    }
  }
  return (
    <Router history={browserHistory}>
      <Route path='/' component={App} storage={userStore}>
        <IndexRoute component={Home} />
        <Route path='home' component={Home} />
        <Route path='locator' component={LocatorContainer} onEnter={requireAuth} storage={userStore}/>
        <Route path='map' component={MapContainer} />
        <Route path='login' component={Login} storage={userStore}/>
      </Route>
    </Router>
  )
}
