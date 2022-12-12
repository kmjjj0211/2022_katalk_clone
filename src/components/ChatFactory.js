import React, { useState } from 'react'
import {db, storage} from "../firebase";
import { Link } from 'react-router-dom';
import { FaPlus,FaRegSmile,FaArrowUp,FaTimes } from "react-icons/fa";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';


function ChatFactory({userObj}) {

  const [chatting,setChatting] = useState("");
  const [attachemant, setAttachemant] = useState("");

  const onChange = (e) => {
   // console.log(e.target.name);
   const {target: {value}} = e;
   setChatting(value);
  }
  const onSubmit = async(e) => {
    e.preventDefault();
    let attachemantURL = "";
    if(attachemant !== ""){
      const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(storageRef, attachemant, 'data_url');
      //console.log(response)
      attachemantURL = await getDownloadURL(ref(storage, response.ref))
    }
    await addDoc(collection(db, "talks"), {
      text: chatting,
      createAt: Date.now(),
      createId: userObj.uid,
      attachemantURL
    });
    setChatting("");
    setAttachemant("");
  }
  const onFileChange = (e) => {
    //console.log(e.target.files)
    const {target: {files}} = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
      const {currentTarget: {result}} = finishedEvent;
      setAttachemant(result);
    }
    reader.readAsDataURL(theFile)
  }
  const onClearAttachment = () => setAttachemant("")

  return (
    <>
    {attachemant && (
       <div className='chatForm__attachemant'>
       <img src={attachemant} style={{backgroundImage: attachemant}} />
       <div className='chatForm__clear' onClick={onClearAttachment}>
         <span>Remove</span>
         <FaTimes />
       </div>
     </div>
    )}
      <form onSubmit={onSubmit}>
        <fieldset className="text_box">
            <legend className="blind">채팅 입력창</legend>
            <label htmlFor="chatImg_add" className="plus_btn"> <FaPlus /></label>
            <input type="file" accept='image/*' style={{opacity:0}} className="chat_file" onChange={onFileChange}/>
            <label htmlFor="chatting" className="blind">채팅입력</label>
            <input type="text" id="chatting" className="text_field" onChange={onChange} value={chatting} name="chat"></input>
            <span className="emotocon_btn"><Link to="#"><FaRegSmile /></Link></span>
            <label htmlFor="chatsubmit" className="submit_btn"><FaArrowUp /></label>
            <input type="submit" id='chatsubmit' style={{opacity:0}} />
        </fieldset>         
      </form>
    </>
  )
}

export default ChatFactory