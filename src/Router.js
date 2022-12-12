import React, {useEffect,useState} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Freinds from './router/Freinds'
import Auth from './router/Auth'
import Chat from './router/Chat'
import Find from './router/Find'
import More from './router/More'
import axios from 'axios';
import Profile from './router/Profile'
import Chatting from './router/Chatting'
import MyProfile from './components/MyProfile'
import MyProfileDetail from './router/MyProfileDetail'

function AppRouter({isLoggedIn,userObj}) {
  const [users, setUsers] = useState([]);
  const [texts, setTexts] = useState([]);

  const getUsers = async() => {
    let response = await axios ("https://jsonplaceholder.typicode.com/users");
    setUsers(response.data);
  }

  const getTexts = async() => {
    let response = await axios ("https://jsonplaceholder.typicode.com/todos");
    setTexts(response.data)
   // console.log(response)
  }

  useEffect(() => {
    getUsers();
    getTexts();
  },[])
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path='/'element={<Freinds userObj={userObj} users={users} texts={texts} />}/>
            <Route path='/chat' element={<Chat userObj={userObj} users={users} texts={texts} />}/>
            <Route path='/find' element={<Find />}/>
            <Route path='/more' element={<More userObj={userObj} users={users} texts={texts}  />}  />
            <Route path='/profile' element={<Profile userObj={userObj}/>}/>
            <Route path='/myprofile' element={<MyProfileDetail userObj={userObj}/>}></Route>
            <Route path='/chatting' element={<Chatting userObj={userObj} />}/>
          </>
        ) : (
          <Route path='/' element={<Auth />}/>
        )}
        
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter