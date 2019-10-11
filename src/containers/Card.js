import React from 'react';
import axios from 'axios';

const feedbackURL = 'https://datain.rvfdp.com/api/v1/gn/sy/platform/aics/report';

class Card extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			id: props.post.question_id,
			like: props.post.up,
			dislike: props.post.down
		};
  }
  
  fetchRes = (type) => {
    axios.get(feedbackURL, {
      params: {
        apikey: '1b7de672-fe55-4860-9229-9e2f3ef82884',
        question_id: this.state.id,
        type: type
      }
    })
    .then(res=>{
      if(res.status === 500){
        alert("操作失败");
      }else if(type === '3' && res.status === 200){
        alert("成功报告错误问题");
      }
    })
    .catch(error=>{
      console.log(error);
    })
  }

	clickLike = () =>{
		let newlike = parseInt(this.state.like) + 1;
		this.setState({
			like: newlike
		}, ()=>{
			this.fetchRes('2');
		})
	}

	clickDislike = () =>{
		let newdislike = parseInt(this.state.dislike) + 1;
		this.setState({
			dislike: newdislike
		}, ()=>{
      this.fetchRes('1');
    })
	}

	clickReport = () => {
    this.fetchRes('3');
	}

	handelOnCopy = () => {
    this.fetchRes('4');
	}

	render() {
		return(
			<div className = 'bg-lightest-gray br3 ma2 shadow-3'>
				<div>
					<h3>{this.props.post.question}</h3>
					<p onCopy={this.handelOnCopy}>{this.props.post.answer}</p>
					<button onClick={this.clickLike} className = 'bg-lightest-gray ba b--white-025 ma2 dim'>
						<span role="img" aria-label="thumbs-up">👍</span> {this.state.like} 
					</button>
					<button onClick={this.clickDislike} className = 'bg-lightest-gray ba b--white-025 ma2 dim'>
						<span role="img" aria-label="thumbs-down">👎</span> {this.state.dislike}
					</button>
					<button onClick={this.clickReport} className = 'bg-lightest-gray ba b--white-025 ma2 dim'>
						<span role="img" aria-label="warning">⚠️</span> {this.state.report}
					</button>
				</div>
			</div>
		);
	}
}
export default Card;