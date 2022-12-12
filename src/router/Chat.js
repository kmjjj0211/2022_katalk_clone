import React from 'react'
import Header from '../components/Header'
import Searchbox from '../components/Searchbox'
import ChattingList from '../components/ChattingLists'
import Tab from '../components/Tab'
import userImg from '../data/userImg.json'
import '../styles/chat.scss';
import { FaCog } from "react-icons/fa";

function Chat({users,texts}) {
  return (
    <div>
      <Header heading={"Chats"} span={"1"} left_item={"Edit"} right_item={<FaCog/>} />
      <main>
        <Searchbox />
        <section className='main_section'>
          <header className="blind"><h2>Friends</h2></header>
          <ul>
            {users.map((user,index) => (
              <ChattingList 
                key={userImg[index].id}
                name={user.name}
                image={userImg[index].image}
                text={texts[index].title.slice(0,30)}
              />
            ))}
          </ul>
        </section>
      </main>
      <Tab />
    </div>
  )
}

export default Chat