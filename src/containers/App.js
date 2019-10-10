import React from 'react';
import CardList from '../components/CardList';
import Search from './Search';
import Scroll from '../components/Scroll';
import '../App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  searchRes = (searchResult) => {
    if(typeof(searchResult) !== 'undefined' && searchResult !== null){
      this.setState({posts: searchResult.data.return_result});
    }else{
      this.setState({posts: []});
    }
  }
  

  render() {
    if(typeof(this.state.posts) == 'undefined' || this.state.posts.length === 0){
      return (
        <div className='tc'>
          <h1>智能客服知识库</h1>
          <Search searchRes = {this.searchRes}/>
          <Scroll>
            <h1>没有结果。。。</h1>
          </Scroll>
        </div>   
      );
    } else {
      return (
        <div className='tc'>
          <h1>智能客服知识库</h1>
          <Search searchRes = {this.searchRes}/>
          <Scroll>
            <CardList posts={this.state.posts} />
          </Scroll>
        </div>
      );
    }
  }
}

export default App;