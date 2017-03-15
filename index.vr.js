import React from 'react';
import {
	AppRegistry,
	asset,
	StyleSheet,
	Pano,
	Text,
	Mesh,
	Image,
	VrButton,
	View,
} from 'react-vr';

const textStyles = {
	color: '#007b00',
	fontSize: 0.0025,
	layoutOrigin: [0.5, 0.5],
	paddingLeft: 0.05,
	paddingRight: 0.05,
	textAlign: 'center',
	textAlignVertical: 'center',
	transform: [{translate: [0, 0 , -0.1], rotateX: 25}]
};

const nopeStyle = {
	color: 'red',
	paddingLeft: 0.05,
	paddingRight: 0.05,
	textAlign: 'center',
	textAlignVertical: 'center',
}

const moneyStyle = {

}


class findYourDollars extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
		this.changeColor = this.changeColor.bind(this);
		this.state = {
			tv: false,
			target: 'Dollars',
			color: 'yellow'
		}
	}
	changeColor() {
		var color = this.state.color;
		color = color === 'yellow' ? '#00000000': 'yellow'
		this.setState({color});
	}
	componentWillMount() {
		const ids = this.state.ids || [];
		ids.push(setInterval(this.changeColor, 250));
		this.setState({ids});
	}
	componentWillUnmount() {
		this.state.ids.forEach(id => clearInterval(id));
	}
	onClick(property) {
		const obj = {};
		obj[property] = true,
			this.setState(obj);
	}
	render() {
		return (
			<View>
				<Pano
					source={asset('room.jpg')}
					style={{ transform: [
						{ rotateY: 90 },
					]}}
				/>
				<Text style={textStyles}>Can You</Text>
				<Text style={textStyles}>Find Your</Text>
				<Text style={textStyles}>{this.state.target}?</Text>
				<Mesh
					style={{ transform: [
						{ translate: [0,-0.025, -0.65] },
						{ rotateX: 75 },
						{ scale: 0.0010 }
					]}}
					source={{mesh: asset('frame.obj'), texture:asset('frame.jpg')}}
				/>

			<VrButton onClick={() => this.onClick('tv')}>
				<View style={{
					width:1.2,
					height: 0.8,
					backgroundColor: '#00FFFF00',
					layoutOrigin: [1, 2],
					transform: [
						{translate: [0.85, -0.8, 2]},
						{ rotateY: 180 }
					]
				}} >
				{ this.state.tv ? (
					<Image source={asset('monies.png')} style={{ 
						backgroundColor: this.state.color, 
						width: 1.2,
						height : 0.7,
						transform: [{rotateY: 8}]
					
					}} />
					): null }
			</View>
		</VrButton>
	</View>
		);
	}
};

AppRegistry.registerComponent('findYourDollars', () => findYourDollars);
