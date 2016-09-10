import React ,{Component} from 'react';
import {observer} from 'mobx-react';
import {blue500,blueGrey50,deepOrange500} from 'material-ui/styles/colors'
import {FlatButton} from 'material-ui';

const style = {
	textAlign : 'center',
	position:'absolute',
	height: '100%',
	width: '100%'
}

const welcomeStyle = {
	fontSize: '48px',
  backgroundColor: blue500,
  padding: '120px 24px 120px 24px',
  boxSizing: 'border-box',
  textAlign: 'center',
	height: '100%'
}

const buttonStyle = {
  backgroundColor: deepOrange500,
	color: blueGrey50,
	margin: 12
}
@observer
export default class Home extends Component {
	onLocateClick () {
		this.props.history.push('/map')
	}
	render() {
		// const {todoStore, viewStore} = this.props;
		return (
			<div className="container" id="home" style={style}>
				<div style={welcomeStyle}>
					<h1>Home Screen</h1>
					<FlatButton onClick={this.onLocateClick.bind(this)} label="Locate Mma!"  primary={true} style={buttonStyle} />
				</div>
			</div>
		)
	}

	componentDidMount() {

	}
}

Home.propTypes = {
};
