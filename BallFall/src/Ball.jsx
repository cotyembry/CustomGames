import React from 'react';
import ReactDOM from 'react-dom';

//TODO: get velocity going on for the speed of the movement
//TODO: turn the movement of the circle around if it hits the edge of the window
//TODO: figure out how to account for the ball hitting the mouse if it is just sitting on the screen since the mouseEnter event doesn't get fired when the ball runs into the mouse


var inc = 0;


var Ball = React.createClass({
	customProps: {
		movementIncrement: 4
	},
	store: {
		//TODO: set this up to hold the last 5 to 10 values of where the ball has been as far as movement goes
	},
	getInitialState: function() {
		return {
			speed: 3,
			isInComponent: false
		}
	},
	intervalSpeed: 20,
	customState: {
		priorIntervalId: "",
		calibrateXMovement: 0,
		calibrateYMovement: 0,
		positionOfContact: ""
	},
	getDefaultProps: function() {

	},
	ballMoving: function() {
		//do changing of direction here
		
		if((this.customState.calibrateXMovement - circle.getBBox().width / 2) <= 0) {
			clearInterval(this.customState.priorIntervalId);

			//for this section it should either be a hit on the top-left or the bottom-left

			this.customState.positionOfContact = this.calculateMovementDirection('top-left|bottom-left');
			//this.customState.positionOfContact = 'top-left';
			this.calculateHit(this.customState.positionOfContact);
			//console.log('one');
		}
		if((this.customState.calibrateYMovement + circle.getBBox().height / 2) >= document.documentElement.clientHeight) {
			clearInterval(this.customState.priorIntervalId);
			this.customState.positionOfContact = 'bottom-left';
			this.calculateHit(this.customState.positionOfContact);
			//console.log('two');
			//console.log(document, document.documentElement, document.documentElement.clientWidth);
		}
		if((this.customState.calibrateXMovement + circle.getBBox().width) >= document.documentElement.clientWidth) {
			clearInterval(this.customState.priorIntervalId);
			this.customState.positionOfContact = 'bottom-right';
			this.calculateHit(this.customState.positionOfContact);
		}
		if((this.customState.calibrateYMovement - circle.getBBox().height / 2) <= 0) {
			clearInterval(this.customState.priorIntervalId);
			this.customState.positionOfContact = 'top-right';
			this.calculateHit(this.customState.positionOfContact);
		}
		//console.log(this.customState.calibrateXMovement + circle.getBBox().width,'width = ', document.documentElement.clientWidth);
		//console.log('in ballMoving()');
	},
	calculateHit: function(e) {
		var self = this;
		//1. find the bottom middle x,y of the circle
		//2. see where the hit occurred
		

		//TODO: the calibrate movement part isn't perfect, it needs to take
		//into account the page shift the element has on it.
		//i.e. if the element starts 40 - 50 pixels down the page, this
		//number is off in that same amount

		var tempBox = self.component.getBBox();
		var tempBounding = self.component.getBoundingClientRect();
		var r = self.component.r.baseVal.value;
		switch(self.customState.positionOfContact === "" ? self.positionOfContact(e) : self.customState.positionOfContact) {
			case 'top-right':
				//move ball down and to the left due to physics
				//TODO: set this up on a setInterval... function call
				// console.log('in top-right');
				// var calibrateXMovement = (tempBox.x + r);
				// var calibrateYMovement = (tempBox.y + r);
				// this.component.setAttribute('cx', calibrateXMovement - customProps.movementIncrement);
				// this.component.setAttribute('cy', calibrateYMovement + customProps.movementIncrement);

				// console.log('just set attributes');
				// clearInterval(this.customState.priorIntervalId);

				// customState.priorIntervalId = setInterval(function() {

				// 	calibrateXMovement -= 3;
				// 	calibrateYMovement += 3;
				// 	var circle = document.getElementById('circle');
				// 	circle.setAttribute('cx', calibrateXMovement - 3);
				// 	circle.setAttribute('cy', calibrateYMovement + 3);

				// 	console.log('in interval, before if statement');

				// 	if((calibrateXMovement - circle.getBBox().width / 2) <= 0) {
				// 		clearInterval(customState.priorIntervalId);
				// 		self.topRightRebound(circle, calibrateXMovement, calibrateYMovement);
				// 		console.log('in if');
				// 	}
				// }, this.speed);


				self.customState.calibrateXMovement = (tempBox.x + r);
				self.customState.calibrateYMovement = (tempBox.y + r);

				clearInterval(self.customState.priorIntervalId);

				self.customState.priorIntervalId = setInterval(function() {

					self.customState.calibrateXMovement -= self.state.speed;
					self.customState.calibrateYMovement += self.state.speed;

					var circle = document.getElementById('circle');
					circle.setAttribute('cx', self.customState.calibrateXMovement - self.state.speed);
					circle.setAttribute('cy', self.customState.calibrateYMovement + self.state.speed);

					var event = new Event('move');

					// Listen for the event.
					self.component.addEventListener('move', function (e) { self.ballMoving() }, false);

					// Dispatch the event.
					self.component.dispatchEvent(event);

					// if((calibrateXMovement - circle.getBBox().width / 2) <= 0) {
					// 	clearInterval(customState.priorIntervalId);
					// 	self.topRightRebound(circle, calibrateXMovement, calibrateYMovement);
					// 	console.log('in if');
					// }
				}, self.intervalSpeed);

				break;

			case 'top-left':

				self.customState.calibrateXMovement = (tempBox.x + r);
				self.customState.calibrateYMovement = (tempBox.y + r);

				//this.component.setAttribute('cx', self.customState.calibrateXMovement + customProps.movementIncrement);
				//this.component.setAttribute('cy', self.customState.calibrateYMovement + customProps.movementIncrement);
				

				clearInterval(self.customState.priorIntervalId);

				self.customState.priorIntervalId = setInterval(function() {

					self.customState.calibrateXMovement += self.state.speed;
					self.customState.calibrateYMovement += self.state.speed;

					var circle = document.getElementById('circle');
					circle.setAttribute('cx', self.customState.calibrateXMovement + self.state.speed);
					circle.setAttribute('cy', self.customState.calibrateYMovement + self.state.speed);
				
					var event = new Event('move');

					// Listen for the event.
					self.component.addEventListener('move', function (e) { self.ballMoving() }, false);

					// Dispatch the event.
					self.component.dispatchEvent(event);

				}, self.intervalSpeed);

				break;

			case 'bottom-right':
				self.customState.calibrateXMovement = (tempBox.x + r);
				self.customState.calibrateYMovement = (tempBox.y + r);
				self.component.setAttribute('cx', self.customState.calibrateXMovement - self.state.speed);
				self.component.setAttribute('cy', self.customState.calibrateYMovement - self.state.speed);


				clearInterval(self.customState.priorIntervalId);

				self.customState.priorIntervalId = setInterval(function() {

					self.customState.calibrateXMovement -= self.state.speed;
					self.customState.calibrateYMovement -= self.state.speed;
					var circle = document.getElementById('circle');
					circle.setAttribute('cx', self.customState.calibrateXMovement - self.state.speed);
					circle.setAttribute('cy', self.customState.calibrateYMovement - self.state.speed);

					var event = new Event('move');

					// Listen for the event.
					self.component.addEventListener('move', function (e) { self.ballMoving() }, false);

					// Dispatch the event.
					self.component.dispatchEvent(event);

				}, self.intervalSpeed);

				break;

			case 'bottom-left':

				self.customState.calibrateXMovement = (tempBox.x + r);
				self.customState.calibrateYMovement = (tempBox.y + r);
				self.component.setAttribute('cx', self.customState.calibrateXMovement + self.state.speed);
				self.component.setAttribute('cy', self.customState.calibrateYMovement - self.state.speed);
				
				clearInterval(self.customState.priorIntervalId);

				self.customState.priorIntervalId = setInterval(function() {

					self.customState.calibrateXMovement += self.state.speed;
					self.customState.calibrateYMovement -= self.state.speed;
					var circle = document.getElementById('circle');
					circle.setAttribute('cx', self.customState.calibrateXMovement + self.state.speed);
					circle.setAttribute('cy', self.customState.calibrateYMovement - self.state.speed);

					var event = new Event('move');

					// Listen for the event.
					self.component.addEventListener('move', function (e) { self.ballMoving() }, false);

					// Dispatch the event.
					self.component.dispatchEvent(event);

				}, self.intervalSpeed);

				break;

			default:
				console.log('Error: in default case in Ball.jsx');
		}


	},
	calculateMovementDirection: function(whereToHit) {
		//here I need to look at the direction the ball was moving previously and return where it needs to go from here
		switch(whereToHit) {
			case 'top-left|bottom-left': 
				

				break;
		}
	},
	componentDidMount: function() {
		console.log(this.component.getBBox());
	},
	mouseEnter: function(e) {
		e.persist();
		console.log('in mouseEnter()');
		
		this.setState({isInComponent: true}, function() {
			console.log('setState() is done');
			inc++;
			clearInterval(this.customState.priorIntervalId);
			if(inc == 1) {
				this.calculateHit(e);
			}
			else {
				this.customState.positionOfContact = 'bottom-right';
				this.calculateHit(this.customState.positionOfContact);
			}

		});
		// this.setState({value: event.target.value}, function () {
  //   		console.log(this.state.value);
		// });
		
		

	},
	mouseLeave: function() {
		this.setState({isInComponent: false}, function() {
			
		})
	
	},
	onClick: function() {
		clearInterval(customState.priorIntervalId);
	},
	positionOfContact: function(e) {
		//return where it was hit
		//i.e. top, bottom, left, right, top-right,
		//top-left, bottom-right, bottom-left

		var tempBounding = this.component.getBoundingClientRect();
		var tempBox = this.component.getBBox();
		// console.log(tempBounding);
		// console.log(tempBox);
		// console.log('clX:', e.clientX, 'clY:',e.clientY);
		// e.clientX
		// e.clientY

		if(e.clientY < (tempBox.y + tempBox.width / 2)) {
		//top
			//top-left or top-right?
			if((tempBox.x + tempBox.width / 2) < e.clientX) {
				//top-right
				return 'top-right'

			}
			else {
				//top-left
				return 'top-left'
			}
		}
		else {
		//bottom
			//bottom-left or bottom-right?
			if((tempBox.x + tempBox.width / 2) < e.clientX) {
				//bottom-right
				return 'bottom-right'

			}
			else {
				//bottom-left
				return 'bottom-left'
			}
		}

		
	},
	render: function() {
		return (
			<svg style={svgStyle}>
				<circle key="1" id="circle" fill="purple" ref={ (c) => this.component = c }  onClick={this.onClick} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} r='40' cy='100' cx='100' />
			</svg>
		)
	},
	bottomLeftRebound: function(circle, calibrateXMovement, calibrateYMovement) {
		var self = this;
		customState.priorIntervalId = setInterval(function() {
			calibrateXMovement -= this.state.speed;
			calibrateYMovement -= this.state.speed;
			var circle = document.getElementById('circle');
			circle.setAttribute('cx', calibrateXMovement - this.state.speed);
			circle.setAttribute('cy', calibrateYMovement - this.state.speed);

			if(calibrateYMovement <= 44) {
				clearInterval(customState.priorIntervalId)
			}
			

		}, this.state.speedthis.state.speed);
	},
	bottomRightRebound: function(circle, calibrateXMovement, calibrateYMovement) {
		var self = this;
		customState.priorIntervalId = setInterval(function() {
			calibrateXMovement += 3;
			calibrateYMovement -= 3;
			var circle = document.getElementById('circle');
			circle.setAttribute('cx', calibrateXMovement + 3);
			circle.setAttribute('cy', calibrateYMovement - 3);

			if((calibrateXMovement + circle.clientWidth + 45) >= document.documentElement.clientWidth) {
				clearInterval(customState.priorIntervalId);
				self.bottomLeftRebound(circle, calibrateXMovement, calibrateYMovement);


			}
		}, 33);
	},
	topRightRebound: function(circle, calibrateXMovement, calibrateYMovement) {
		var self = this;
		customState.priorIntervalId = setInterval(function() {
			console.log('in topRightRebound()');
			calibrateXMovement += 3;
			calibrateYMovement += 3;
			var circle = document.getElementById('circle');
			circle.setAttribute('cx', calibrateXMovement + 3);
			circle.setAttribute('cy', calibrateYMovement + 3);

			if((calibrateYMovement + circle.getBBox().height) >= document.documentElement.clientHeight) {
				console.log('in if inside topRightRebound()');
				clearInterval(customState.priorIntervalId);
				self.bottomRightRebound(circle, calibrateXMovement, calibrateYMovement);
			}
		}, 33);
	}
});

var svgStyle = {
	height: '100%',
	width: '100%'
}

export default Ball;
