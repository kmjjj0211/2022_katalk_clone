import React from 'react'
import Header from '../components/Header'
import Searchbox from '../components/Searchbox'
import Tab from '../components/Tab'
import '../styles/freinds.scss'
import { FaCog } from "react-icons/fa"
import FreindsLists from '../components/FreindsLists'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';

import { Link, useLocation } from 'react-router-dom';
import userImg from '../data/userImg.json'
import MyProfile from '../components/MyProfile'



function Freinds({users,texts,userObj}) {

  return (
    <div>
      <Header heading={'Friends'} span={"1"} left_item={'Manage'} right_item={<FaCog/>}/>
      <main>
        <Searchbox />
        <section className='main_section'>
          <header>
            <h2>My Profile</h2>
          </header>
          <ul>
            <MyProfile userObj={userObj}/>
          </ul>
        </section>
        <section className='main_section'>
          <header>
            <h2>Friends</h2>
          </header>
          <ul>
            {users.map((user,index) => (
              <FreindsLists 
                key={user.id}
                name={user.name}
                image={userImg[index].image}
                text={texts[index].title.slice(0,30)}
                bgimage={userImg[index].bgimage}
                userObj={userObj}
                isOwner={user.createId === userObj.uid}
              />
            ))}
          </ul>
        </section>
      </main>
      <Tab />
    </div>
  )
}

export default Freinds