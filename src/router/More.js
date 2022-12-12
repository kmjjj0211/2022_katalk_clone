import React from 'react'
import Header from '../components/Header'
import Tab from '../components/Tab'
import '../styles/more.scss'
import { Link,useNavigate } from 'react-router-dom'
import { FaRegSmile,FaPaintBrush,FaRegHandPeace,FaUserCircle,FaInfoCircle,FaUtensils,FaHouseUser,FaTv,FaPencilAlt,FaGraduationCap,FaBuilding,FaWonSign,FaVideo, FaCog } from "react-icons/fa";
import { authService } from '../firebase';


function More({userObj}) {
 // console.log(userObj)
  const navigate = useNavigate();

  const onLogOutClick = () => {
    authService.signOut();
    navigate("/"); // 홈으로 이동
  }
  return (
    <div>
    <Header heading={"More"} left_item={"Edit"} right_item={< FaCog />}/>
      <main>
      {/* user_info */}
      <section className="user_info">
        <h2 className="blind">사용자 정보</h2>
        <span className="profile_img empty"><img src={userObj.photoURL} alt="{userObj.photoURL}" /></span>
          <span className="profile_info">
              <span className="profile_name">{userObj.displayName}</span>
              <span className="profile_email"></span>
          </span>
        <span className='logOut_Btn' onClick={onLogOutClick}>Log Out</span>
    </section>         
      {/* //user_info */}
      {/* user_manu */}
      <section className="user_manu">
          <h2 className="blind">사용자 메뉴</h2>
          <ul>
          <li><Link to="#"><FaRegSmile />Emoticons</Link></li>
          <li><Link to="#"><FaPaintBrush />Themes</Link></li>
          <li><Link to="#"><FaRegHandPeace />Plus Friend</Link></li>
          <li><Link to="#"><FaUserCircle />Account</Link></li>
          </ul>
      </section>
      {/* //user_manu */}
      {/* plus_friends */}
      <section className="plus_friends">
          <header>
            <h2>Plus Friends</h2>
            <span><FaInfoCircle />Learn More</span>
          </header>
          <ul className="plus_list">
            <li><Link to="#"><FaUtensils />Order</Link></li>
            <li><Link to="#"><FaHouseUser />Store</Link></li>
            <li><Link to="#"><FaTv />TV Channel/Radio</Link></li>
            <li><Link to="#"><FaPencilAlt />Creation</Link></li>
            <li><Link to="#"><FaGraduationCap />Education</Link></li>
            <li><Link to="#"><FaBuilding />Politics/Society</Link></li>
            <li><Link to="#"><FaWonSign />Finance</Link></li>
            <li><Link to="#"><FaVideo />Movies/Music</Link></li>
          </ul>
      </section>
      {/* //plus_friends */}
      {/* more_app */}
      <section className="more_app">
          <h2 className="blind">앱 더보기</h2>
          <ul>
          <li><Link to="#"><span className="app_icon"></span>Kakao Story</Link></li>
          <li><Link to="#"><span className="app_icon"></span>Path</Link></li>
          <li><Link to="#"><span className="app_icon"></span>Kakao friends</Link></li>
          </ul>
      </section>
      {/* //more_app */}
      </main>
      <Tab />
    </div>
  )
}

export default More