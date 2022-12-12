import { async } from '@firebase/util';
import React, { useState } from 'react'
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { authService,db,storage } from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

function MyProfileBgImg({userObj}) {
  const [attachment,setAttachment] = useState("")

  const onFileChange = (e) => {
    const {target: {files,name}} = e;
    if(name === "backImg"){
      const theFile = files[0];
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
        const {currentTarget: {result}} = finishedEvent;
        setAttachment(result);
      }
      reader.readAsDataURL(theFile);
    }
  }

  const onClearAttachment = (e) => {
    setAttachment("")
  }

  const onSubmit = async(e) => {
    e.preventDefault();  
    let attachmentURL = "";
    if(attachment !== ""){
      const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(storageRef, attachment, 'data_url');
      //console.log(response)
      attachmentURL = await getDownloadURL(ref(storage, response.ref))
    }
    await addDoc(collection(db, "talks"),{
      attachmentURL
    });
    setAttachment("");
  }

  return (
    <form className='bgimg' onSubmit={onSubmit}>
        <legend className='blind'></legend>
        {/* <input type="submit" /> */}
        {/* <label htmlFor="profile_bgimg" className='profile_bgimg_add'>add bg photo</label> */}
        <input type="file" id='profile_bgimg' className='profile_bgimg_add' onChange={onFileChange} accept='image/*' name='backImg' style={{opacity:0}}/>   
        <section className="background">
            <h2 className="blind">My profile background image</h2>   
            {attachment &&
            <>
              <button onClick={onClearAttachment}>Clear</button>
              <img src={attachment} style={{backgroundImageURL:{attachment}}} alt=""/>             
            </>             
            }               
        </section>        
    </form>
  )
}

export default MyProfileBgImg