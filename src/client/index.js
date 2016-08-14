import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import {Root} from '../containers'

// const initialState = window.__INITIAL_STATE__
const rootEl = document.getElementById('app')
// console.log('Test App')
// console.log(AppContainer)
// console.log(Root)
render(<Root />, rootEl)

// render(
//   <AppContainer>
//     <Root />
//   </AppContainer>,
//   rootEl
// )
//
// if (module.hot) {
//   module.hot.accept('../containers/Root', () => {
//     const NextRootApp = require('../containers/Root').default
//     render(
//       <AppContainer>
//         <NextRootApp />
//       </AppContainer>,
//       rootEl
//     )
//   })
// }
