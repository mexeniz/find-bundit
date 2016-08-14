import React ,{Component, PropTypes} from 'react'
import {observer} from 'mobx-react'
import DevTool from 'mobx-react-devtools'
import Header from './Header'
import Footer from './Footer'
import {Paper} from 'material-ui'

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

@observer
export default class App extends Component {
	render() {
    const {children} = this.props
    // console.log('Test Children')
    // console.log(children))
		// const {todoStore, viewStore} = this.props;
		return (
				<div id='main'>
					<DevTool />
					<Header />
					{children}
          <Footer />
				</div>
		);
	}

	componentDidMount() {

	}
}

App.defaultProps = {
  //children : 'Children is here!'
}

App.propTypes = {
};
