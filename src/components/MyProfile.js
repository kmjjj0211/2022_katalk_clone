import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function MyProfile({userObj}) {
  return (
    <li>
        <Link to="/myprofile">   
            <span className='profile_img empty'><img src={userObj.photoURL} alt="{userObj.photoURL}" /></span>
            <span className='profile_name'>{userObj.displayName}</span>
            <span className='profile_messages'>{userObj.email}</span>
        </Link>
    </li>
  )
}

export default MyProfile