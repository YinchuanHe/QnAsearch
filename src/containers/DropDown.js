import React from 'react';
import Select from 'react-select';

const customStyles = {
  control: base => ({
    ...base,
    height: 52,
    minHeight: 52
  })
};

const games = [
  { label: "通用", value: '0' },
  { label: "MUS精灵盛典", value: '5748' },
  { label: "斗罗大陆", value: '5690' },
  { label: "大天使之剑", value: '5650' },
  { label: "永恒纪元", value: '5346' },
  { label: "烽火攻城", value: '5761' },
  { label: "一刀传世", value: '5775' },
  { label: "云上城之歌", value: '5793' },
  { label: "屠龙破晓", value: '5725' },
  { label: "剑与轮回", value: '5680' },
  { label: "鬼语迷城", value: '5662' },
  { label: "其他游戏", value: '99999' },
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
      <div className="container w-20">
        <div className="row">
          <div className=""></div>
          <div className="">
            <Select
              styles={customStyles}
              placeholder="选择游戏"
              value={ selectedOption }
              onChange={this.handleChange}
              options={ games } />
          </div>
          <div className=""></div>
        </div>
      </div>
    );
  }
}

export default DropDown