import { useState,useEffect } from "react";
import AppRouter from "./Router";
import { authService } from './firebase';
import { onAuthStateChanged } from "firebase/auth";
import './styles/common.scss';
import { FaCommentDots } from "react-icons/fa";


function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);//로그인한 사용자 정보

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
     // console.log(user);
      if (user) {
        //User is signed in
        setIsLoggedIn(user);
        setUserObj(user); 
        //const uid = user.uid;

      } else {
        //User is signed out
        setIsLoggedIn(false);
      }
      setInit(true);
    });   
  }, [])
  //console.log(authService.currentUser);
  // currentUser : 현재 로그인한 사람의 정보를 알수있음.
  // null도 false.

  return (
    <>
      {init ? 
        (<AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />) 
        :
        (<div className="Loading">
          <span className="load_icon"><FaCommentDots/></span>
          <span className="load_text">KAKAO TALK</span>
        </div>)
      }  
    </>
  );
}

export default App;
