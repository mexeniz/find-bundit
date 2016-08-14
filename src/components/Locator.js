import React ,{Component} from 'react'
import {observer} from 'mobx-react'

@observer
class Locator extends Component {
  render () {
    return (
      <div id='locator' style={{textAlign : 'center'}}>
        Just a locator :0
      </div>
    )
  }
}
export default Locator
