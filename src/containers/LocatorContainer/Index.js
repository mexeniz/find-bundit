import React ,{Component} from 'react'
import {observer} from 'mobx-react'
import {Locator} from '../../components'

@observer
class LocatorContainer extends Component {
  render () {
    console.log('Locator')
    console.log(Locator)
    return (
      <Locator />
    );
  }
}
export default LocatorContainer
