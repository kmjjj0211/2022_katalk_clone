import React,{useEffect, useState} from 'react'
import { Link,useLocation } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";



function ChatBox({chatText,chatObj,isOwner,attachemantURL}) {
  const location = useLocation();
  const {image,name} = location.state; 

  const [nowDate, setNowDate] = useState(chatObj.createAt);

  const onDeleteClick = async(e) => {
    const ok = window.confirm("삭제하시겠습니까?");
    if(ok){
      const data = await deleteDoc(doc(db, "talks",`/${chatObj.id}`));
    }
  }

  useEffect(()=> {
    let timeStamp = chatObj.createAt;
    const now = new Date(timeStamp);
    setNowDate(now.toUTCString())
  },[])
  


  return (
    <>
    {isOwner ? (
      <div className="chat_box my">
          <span className="chat">
              <span className="chat_delete" onClick={onDeleteClick}>
                <FaTrash />
              </span>
            {chatText}
            {chatObj.attachemantURL && (
              <img className='chatImage' src={chatObj.attachemantURL} alt="{chatObj.attachemantURL}" />
            )}
          </span>          
          <span className="chat_time"><span>{nowDate}</span></span>
      </div>
    ) : (
      <div className="chat_box other">
      <div className="other_info">
          <Link to="/profile"><span className="profile_img empty">
          <img src={image} alt={image} />
            </span></Link>
          <span className="profile_name">{name}</span>
      </div>
      <span className="chat">{chatText}</span>
      <span className="chat_time"><span>{nowDate}</span></span>
  </div>
    )}
</>
  )
}

export default ChatBox