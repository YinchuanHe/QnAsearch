import React from 'react';
import axios from 'axios';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const feedbackURL = 'https://datain.rvfdp.com/api/v1/gn/sy/platform/aics/report';

class Card extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
      message: '',
			id: props.post.question_id,
			like: props.post.up,
      dislike: props.post.down,
      isButtonDisabled: false,
      imageLoaded: false
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

	clickCopy = () => {
    this.fetchRes('4');
    console.log('Copied!!')
  }
  
  timeOutAfterClick = (e) => {
    e.preventDefault();
    this.setState({
        isButtonDisabled: true
    });

    // **** here's the timeout ****
    setTimeout(() => this.setState({ isButtonDisabled: false }), 2000);
  }

  addLineBreaks = (string) =>
  string.split('<br/>').map((text, index) => (
    <React.Fragment key={`${text}-${index}`}>
      {text}
      <br />
    </React.Fragment>
  ));

  onLoad = () => {
    this.setState({
        imageLoaded: true
    })
  }

	render() {
    const style = this.state.imageLoaded ? {} : {visibility: 'hidden'}
		return(
			<div className = 'bg-lightest-gray br3 ma2 shadow-3'>
				<div>
					<h3>{this.props.post.question}</h3>
          <p onCopy={this.clickCopy}>{this.addLineBreaks(this.props.post.answer)}</p>
          <img src={this.props.post.answer_pic} style={style} onLoad={this.onLoad} alt='answer_image'/>
					<button onClick={this.clickLike} className = 'bg-lightest-gray ba b--white-025 br2 ma2 dim'>
						<span role="img" aria-label="thumbs-up">👍</span> {this.state.like} 
					</button>
					<button onClick={this.clickDislike} className = 'bg-lightest-gray ba b--white-025 br2 ma2 dim'>
						<span role="img" aria-label="thumbs-down">👎</span> {this.state.dislike}
					</button>
					<button onClick={this.clickReport} className = 'bg-lightest-gray ba b--white-025 br2 ma2 dim'>
						<span role="img" aria-label="warning">⚠️</span> {this.state.report}
					</button>
					<CopyToClipboard text={this.props.post.answer} onCopy={this.clickCopy}>
            <button 
              onClick={this.timeOutAfterClick} 
              disabled={this.state.isButtonDisabled} 
              className = 'bg-lightest-gray ba b--white-025 br2 ma2 dim'>
            	复制
            </button>
          </CopyToClipboard>
				</div>
			</div>
		);
	}
}
export default Card;