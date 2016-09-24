import React ,{Component} from 'react';
import {observer} from 'mobx-react';
import {lightBlue50,blue500,blueGrey50,deepOrange500} from 'material-ui/styles/colors'
import {FlatButton} from 'material-ui';

const style = {
	textAlign : 'center',
	position:'absolute',
	height: 'auto',
	top: '4em',
	bottom: '8em',
	width: '100%'
}

const welcomeStyle = {
	position : "relative",
  backgroundColor: lightBlue50,
	// backgroundRepeat : "no-repeat",
  // backgroundPosition : "center",
	// backgroundImage: "url('../image/mma_grad_cover.jpg')",
  padding: '120px 24px 120px 24px',
  boxSizing: 'border-box',
  textAlign: 'center',
	height: '100%',
}

const buttonStyle = {
  backgroundColor: deepOrange500,
	color: blueGrey50,
	// margin: 12
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
