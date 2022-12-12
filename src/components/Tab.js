import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaUserAlt,FaComment,FaSearch,FaEllipsisH } from "react-icons/fa";
import '../styles/tab.scss'


export default function Tab() {

  return (
    <nav className='tab_bar'>
    <ul>
    <li>
        <NavLink end to="/" 
          className={ ( {isActive} ) => isActive ? "active" : "" }>
          <FaUserAlt />Friends
        </NavLink>
    </li>
    <li>
        <NavLink to="/chat" className={ ( {isActive} ) => isActive ? "active" : ""}>
          <FaComment />Chats
        </NavLink>
    </li> 
    <li>
        <NavLink to="/find" className={ ( {isActive} ) => isActive ? "active" : ""}>
          <FaSearch />Find
        </NavLink>
    </li>  
    <li>
        <NavLink to="/more" className={ ( {isActive} ) => isActive ? "active" : ""}>
          <FaEllipsisH />More
        </NavLink>
    </li> 
    </ul>
  </nav>
  )
}
