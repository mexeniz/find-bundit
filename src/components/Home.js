import React ,{Component} from 'react';
import {observer} from 'mobx-react';
import {blue500} from 'material-ui/styles/colors'
import DevTool from 'mobx-react-devtools';

const style = {
	textAlign : 'center'
}

const welcomeStyle = {
	fontSize: '48px',
  backgroundColor: blue500,
  padding: '120px 24px 120px 24px',
  boxSizing: 'border-box',
  textAlign: 'center'
}

@observer
export default class Home extends Component {
	render() {
		// const {todoStore, viewStore} = this.props;
		return (
			<div className="container" id="home" style={style}>
				<div style={welcomeStyle}>
					<h1>Home Screen</h1>
				</div>
				<div>
					<p>Just a test for hoom page</p>
				</div>
			</div>
		)
	}

	componentDidMount() {

	}
}

Home.propTypes = {
};
