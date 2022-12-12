import React from 'react'
import { FaPlane,FaWifi,FaMoon,FaBluetoothB,FaBatteryFull } from "react-icons/fa";
import { Link } from 'react-router-dom';
import '../styles/header.scss'

function Header({heading, span, left_item, right_item,right_item2}) {
  return (
    <header className='header'>
    {/* status_bar */}
    <div className='status_bar'>
        <div className='left_item'>
            <FaPlane />
            <FaWifi/>
        </div>
        <div className='center_item'>
            <span>15</span>:<span>33</span>
        </div>
        <div className="right_item">
            <FaMoon/>
            <FaBluetoothB/>
            <span>100%</span>
            <FaBatteryFull/>
        </div>
    </div>
    {/* //status_bar */}
    {/* title_bar */}
    <div className="title_bar">
        <h1>{heading} <span>{span}</span></h1> 
        <div className="left_item">
            <Link to="#">
               {left_item} 
            </Link>
        </div>
        <div className="right_item">
            <Link to="#">
                <span> {right_item}</span>
               <span className='second'>{right_item2}</span>
            </Link>
        </div>
    </div>          
    {/* //title_bar */}
</header>
  )
}

export default Header