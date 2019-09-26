import React from 'react';

const SearchBox = ({searchChange}) => {
	return (
    <div className='pa2'>
      <input
        className='pa3 w-80 ba b--blue bg-lightest-blue'
        type='search'
        placeholder='搜索。。。'
        onChange={searchChange}
      />
    </div>
	)
}

export default SearchBox;