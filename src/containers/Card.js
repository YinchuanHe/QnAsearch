import React from 'react';

class Card extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			id: props.post.id,
			like: props.post.like,
			dislike: props.post.dislike
		};
	}

	clickLike = () =>{
		let newlike = parseInt(this.state.like) + 1;
		this.setState({
			like: newlike
		})
	}

	clickDislike = () =>{
		let newdislike = parseInt(this.state.dislike) + 1;
		this.setState({
			dislike: newdislike
		})
	}

	render() {
		return(
			<div className = 'bg-light-blue dib br3 ma2 shadow-3'>
				<div>
					<h2>{this.props.post.question}</h2>
					<p>{this.props.post.answer}</p>
					<button onClick={this.clickLike} className = 'bg-light-red did ma1 br4 dim'>
						<span role="img" aria-label="thumbs-up">👍</span> {this.state.like} 
					</button>
					<button onClick={this.clickDislike} className = 'bg-light-red did ma1 br4 dim'>
						<span role="img" aria-label="thumbs-down">👎</span> {this.state.dislike}
					</button>
				</div>
			</div>
		);
	}
}
export default Card;