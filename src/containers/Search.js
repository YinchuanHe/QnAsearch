import React from 'react';
import axios from 'axios';
import DropDown from './DropDown'

const URL = 'http://datain.rvfdp.com/api/v1/gn/sy/platform/aics';
const APIKEY = '1b7de672-fe55-4860-9229-9e2f3ef82884';


class Search extends  React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      gameId: '',
      results: '',
    };
    this.cancel = '';
  }

  fetchTypeSearchResults = ( gameId, query ) => {
    if(query === ''){
      this.loadTrend();
    }else {
      if (this.cancel) {
        // Cancel the previous request before making a new request
        this.cancel.cancel();
      }
      // Create a new CancelToken
      this.cancel = axios.CancelToken.source();
      axios
        .get(URL+'/suggestion', {
          params:{
            apikey: APIKEY,
            game_id: gameId,
            search_key: query,
          },
          cancelToken: this.cancel.token,
        })
        .then((res) => {
          this.setState({
            results: res,
          }, () => {
            //console.log('return search res');
            this.sendDatatoApp(res);
          } );
        })
        .catch((error) => {
          if (axios.isCancel(error) || error) {
            this.setState({
              message: 'Failed to fetch results.Please check network',
            });
          }
        });
    }
    
  }

  loadTrend=()=> {
    if(this.state.query === ''){
      axios.get(URL+'/trending',{
        params: {apikey: '1b7de672-fe55-4860-9229-9e2f3ef82884'}
      })
      .then((res) => {
        if(res.data.return_code === 200){
          this.setState({
            results: res,
          }, () => {
            this.sendDatatoApp(res);
          } );
        }else if(res.data.return_code === 201){
          console.log('未找到结果')
          this.sendDatatoApp(null);
        }else if(res.data.return_code === 202){
          console.log('处理失败')
          this.sendDatatoApp(null);
        }
      });
    } 
  }

  fetchButtonSearch=( gameId, query )=>{
    if(query === ''){
      this.loadTrend();
    }else{
      axios.get(URL+'/search',{
        params: {
          apikey: '1b7de672-fe55-4860-9229-9e2f3ef82884',
          game_id: gameId,
          search_key: query
        },
      })
      .then((res) => {
        if(res.data.return_code === 200){
          this.setState({
            results: res,
          }, () => {
            this.sendDatatoApp(res);
          } );
        }else if(res.data.return_code === 201){
          console.log('未找到结果')
          this.sendDatatoApp(null);
        }else if(res.data.return_code === 202){
          console.log('处理失败')
          this.sendDatatoApp(null);
        }
      });
    }
  }

  sendDatatoApp=(res)=>{
    this.props.searchRes(res);
  }

  getGameId=(gameId)=>{
    this.setState({gameId: gameId});
  }

  handleOnInputChange = (event) => {
    const query = event.target.value;
    const gameId = this.state.gameId;
    
    this.setState({ query, message: ''}, () => {
      this.fetchTypeSearchResults(gameId, query);
    });
  }

  handleOnClick = () => {
    this.fetchButtonSearch(this.state.gameId ,this.state.query);
  }

  componentDidMount(){
    this.loadTrend();
  }

  render() {
    return (  
      <div className="container">
        <div className="flex justify-center">
          <DropDown sendGameId={this.getGameId}/>
          <label className="search-label" htmlFor="search-input">
            <input
              type="text"
              className='pa3 ba b--blue bg-lightest-blue'
              value={this.state.query}
              id="search-input"
              placeholder="搜索。。。"
              onChange={this.handleOnInputChange}
            />
            <button className="pa3 bg-white ba b--white-025 dim" onClick={this.handleOnClick}>
              <span role="img" aria-label="search">🔍</span>
            </button>
          </label>
        </div>
      </div>
    )
  }
}
export default Search;