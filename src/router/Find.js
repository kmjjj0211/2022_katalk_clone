import React, {useState,useEffect} from 'react'
import Header from '../components/Header';
import Tab from '../components/Tab'
import '../styles/Find.scss'

import { FaAddressBook,FaQrcode,FaMobileAlt,FaEnvelope } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Find() {

  return (
    <div>
    <Header heading={"Find"} left_item={'Edit'} right_item={""}/> 
    <main>
      <ul className="find_method">
        <li><Link to="#"><FaAddressBook />Find</Link></li>
        <li><Link to="#"><FaQrcode />QR Code</Link></li>
        <li><Link to="#"><FaMobileAlt />Shake</Link></li>
        <li><Link to="#"><FaEnvelope />Invite via SNS</Link></li>
      </ul>
      <section className="recommend_section">
        <header><h2>Recommend Friends</h2></header>
        <ul>
        <li>You Have no recommend friends.</li>
        </ul>
      </section>
    </main>
    <Tab />
  </div>
  )
}

export default Find