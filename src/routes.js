import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import {
  App,
  Home
} from './components'
import {LocatorContainer} from './containers'

export default () => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='home' component={Home} />
        <Route path='locator' component={LocatorContainer} />
      </Route>
    </Router>
  )
}
