import React from 'react';
import Card from '../containers/Card';

const CardList = ({posts}) => {
  
	return(
		<div>
      {
        posts.map((value, index) => {
          return (<Card 
            key={index} 
            post={posts[index]}/
          >)
        })
      }
    </div>
	);
}

export default CardList;