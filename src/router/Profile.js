import React, { useState } from 'react'
import Header from '../components/Header';
import '../styles/profile.scss'
import { Link, useLocation } from 'react-router-dom';
import { FaTimes,FaUserAlt,FaComment,FaPencilAlt } from "react-icons/fa";

function Profile(props) {
    const location = useLocation();
    const {image,name,text,bgimage} = location.state;
    console.log(location.state)
    const {userObj} = props;
    console.log(userObj)
  return (
    <div className='classProfile'>
        <Header heading={""} left_item={<FaTimes/>} right_item={<FaUserAlt />} />
        <main>
            <section className="background">
                <h2 className="blind">My profile background image</h2>               
                <img src={bgimage} alt="{bgimage}" />
            </section>
            <section className="profile">
                <h2 className="blind">My profile info</h2>
                <div className="profile_img empty">       
                    <img src={image} alt="{image}" />            
                </div>
                <div className="profile_cont">
                    <span className="profile_name">{name}</span>
                    <input type="mail" className="profile_email" placeholder={text} />
                    <ul className="profile_menu">
                    <li>
                        <Link to="#">
                            <span className="icon">
                                <FaComment />
                            </span>
                            Chatroom
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <span className="icon">
                                <FaPencilAlt />
                            </span>
                            
                            Edit Profile
                        </Link>
                    </li>
                    </ul>
                </div>
            </section>
        </main>
    </div>
  )
}
export default Profile