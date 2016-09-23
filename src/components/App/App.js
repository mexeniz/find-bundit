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
  }
  componentWillMount () {
  }
	render () {
    const {children} = this.props;
    return (
				<div id='main'>
					<Header />
          <Provider store={{locationStore:this.store}} token={this.props.route.storage.getToken()}>
            {children}
          </Provider>
          <Footer />
				</div>
		);
	}
}

App.defaultProps = {
  token : ''
}

App.propTypes = {
  route : PropTypes.object.isRequired
};
