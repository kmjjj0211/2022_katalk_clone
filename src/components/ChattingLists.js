import React from 'react';
import { Link } from 'react-router-dom';

function ChattingLists(props) {
  const {image,name,text} = props;
  return (
    <li>
        <Link to={"/chatting"} state={props}>
            <span className='chats_img empty'><img src={image} alt="{image}" /></span>
            <span className='chats_cont'>
                <span className='chats_name'>{name}</span>
                <span className='chats_latest'>{text}</span>
            </span>
            <span className='chats_time'><span>15</span>:<span>33</span></span>
        </Link>
    </li>
  )
}

export default ChattingLists