import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'
import '../App.css';
//import {robots} from './robots';

class App extends Component {
  constructor() {
    super()
    this.state = {
      posts: [],
      searchfield:''
    }
  }

  componentDidMount() {
    fetch('http://localhost:4000/res')
      .then(response=> {
        return response.json();
      })
      .then(res => {
        this.setState({posts: res[2].return_result})
      })
      // .then(res => console.log(res[2].return_result))
  }

  onSearchChange = (event) => {
    this.setState({searchfield: event.target.value})
  }

  render() {
    // const filteredPosts = this.state.posts.filter( post =>{
    //   return post.question.toLowerCase().includes(this.state.searchfield.toLowerCase());
    // })
    if(this.state.posts.length === 0){
      return (
        <div className='tc'>
          <h1>Internal F&Q</h1>
          <SearchBox></SearchBox>
          <Scroll>
            <h1>Loading...</h1>
          </Scroll>
        </div>   
      );
    } else {
      return (
        <div className='tc'>
          <h1>Internal F&Q</h1>
          {/* <SearchBox searchChange = {this.onSearchChange}/> */}
          <SearchBox></SearchBox>
          <Scroll>
            <CardList posts={this.state.posts} />
          </Scroll>
        </div>
      );
    }
  }
}

export default App;