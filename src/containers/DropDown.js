import React from 'react';
import Select from 'react-select';

const games = [
  { label: "游戏01", value: '99999' },
  { label: "游戏02", value: '99999' },
  { label: "游戏03", value: '99999' },
  { label: "游戏04", value: '99999' },
  { label: "游戏05", value: '99999' },
  { label: "游戏06", value: '99999' },
];

class DropDown extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
    };
  }
  
  handleChange = selectedOption => {
    this.setState({ selectedOption },()=>{
      this.props.sendGameId(this.state.selectedOption.value);
      console.log(`Selected GameId:`, this.state.selectedOption.value);
    });
  };

  render() {
    const { selectedOption } = this.state;
 
    return (
      <div className="container w-third">
        <div className="row">
          <div className="ba b--blue bg-lightest-blue"></div>
          <div className="ba b--blue bg-lightest-blue">
            <Select
              placeholder="选择游戏"
              value={ selectedOption }
              onChange={this.handleChange}
              options={ games } />
          </div>
          <div className="ba b--blue bg-lightest-blue"></div>
        </div>
      </div>
    );
  }
}

export default DropDown