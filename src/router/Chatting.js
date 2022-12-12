import React, { useEffect,useState } from 'react'
import Header from '../components/Header';
import ChatBox from '../components/ChatBox';
import ChatFactory from '../components/ChatFactory';

import '../styles/chatting.scss'
import { FaArrowLeft,FaSearch,FaBars } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { db } from "../firebase";
import { collection, query, onSnapshot,orderBy,getDocs } from "firebase/firestore";
import { async } from '@firebase/util';


function Chatting({userObj}) {
  const location = useLocation();
  const {image,name,text} = location.state;
  const [chattings,setChattings] = useState([]);


  useEffect(() => {
    const q = query(collection(db, "talks"),orderBy("createAt", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({...doc.data(), id:doc.id});
      });
      console.log(newArray);
      setChattings(newArray)
    });
  },[])

  return (
    <div className='classChatting'>
      <Header heading={name} left_item={<FaArrowLeft />} right_item={<FaSearch />} right_item2={<FaBars />}/>
      <main>
        <span className="data_info">Monday,October 17, 2022</span>
        {/* <ChatBox /> */}
        {chattings.map(chatting => (
          <ChatBox 
            key={chatting.id}
            isOwner={chatting.createId === userObj.uid}
            chatText={chatting.text}
            chatObj={chatting}
          />
        ))}
      </main>
      <footer>
        <ChatFactory 
          userObj={userObj}
        />
      </footer>
    </div>
  )
}
export default Chatting