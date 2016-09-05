import React ,{Component, PropTypes} from 'react'
import {observer, Provider} from 'mobx-react'
import DevTool from 'mobx-react-devtools'
import Header from './Header'
import Footer from './Footer'
import {Paper} from 'material-ui'
import {Locator} from '../'
import {LocationStore} from '../../stores'

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

@observer
export default class App extends Component {
  constructor () {
    super()
    this.store = new LocationStore()

  }
  componentDidMount () {
    // console.log('Did mount..')
  }
  componentWillMount () {
    // console.log('Will mount..')
    // this.store.setLocation(107.21,15.02);
    // this.store.setName('test');
    // console.log(this.store);
  }
	render () {
    // console.log('Render..')
    const {children} = this.props;
    // <Provider location={this.store}>
    //      {children}
    // </Provider>
    console.log('this store')
    console.log(children)
    return (
				<div id='main'>
					<DevTool />
					<Header />
          <Provider store={this.store}>
            {children}
          </Provider>
          <Footer />
				</div>
		);
	}
}

App.defaultProps = {
  //children : 'Children is here!'
}

App.propTypes = {
};
