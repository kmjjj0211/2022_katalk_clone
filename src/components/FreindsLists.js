import React from 'react';
import { Link } from 'react-router-dom';

 function FreindsLists({image,name,text,bgimage}) {

  return (
    <li>
        <Link to={"/profile"} state={{image,name,text,bgimage}}>   
            <span className='profile_img empty'><img src={image} alt="{image}" /></span>
            <span className='profile_name'>{name}</span>
            <span className='profile_messages'>{text}</span>
        </Link>
    </li>
  )
}
export default FreindsLists
