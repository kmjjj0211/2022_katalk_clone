import React, { useState } from 'react'
import Header from '../components/Header';
import { getAuth } from "firebase/auth";
import { authService,db,storage } from '../firebase';
import '../styles/profile.scss'
import { Link, useLocation } from 'react-router-dom';
import { FaTimes,FaUserAlt,FaComment,FaPencilAlt } from "react-icons/fa";
import '../styles/myprofiledetail.scss'
import { updateProfile } from "firebase/auth";
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import MyProfileBgImg from '../components/MyProfileBgImg';

function MyProfileDetail({userObj}) {
    const [newDisplayName,setNewDisplayName] = useState(userObj.displayName);
    const [message,setMessage] = useState("")
    const [newPhotoURL,setNewPhotoURL] = useState(userObj.photoURL);


    const onChange = (e) => {
        const {target:{value,name}} = e;
        if(name === "name"){
            setNewDisplayName(value)
        }else if(name === "message"){
            setMessage(value)
        }
        
    }
    const onFileChange = (e) => {
    const {target: {files,name}} = e;
        if(name === "profileImg"){
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
        console.log(finishedEvent);
        const {currentTarget: {result}} = finishedEvent;
        setNewPhotoURL(result);
        }
        reader.readAsDataURL(theFile)
    }
}

    const onSubmit = async(e) => {
        e.preventDefault();   
        let photoURL = "";
        // let newBackGroudImgURL = "";
        const {target:{name}} =e;
        if(userObj.photoURL !== newPhotoURL){
          const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
          const response = await uploadString(storageRef, newPhotoURL, 'data_url');
          //console.log(response)
          photoURL = await getDownloadURL(ref(storage, response.ref))
          await updateProfile(userObj, {photoURL});
         }   
        if(userObj.displayName !== newDisplayName){
          await updateProfile(userObj, {displayName: newDisplayName}); 
        }  
    }

    const imgDelete = () => setNewPhotoURL("")


  return (
<div className='myProfile'>
<Header heading={""} left_item={<FaTimes/>} right_item={<FaUserAlt />} />
<main>
    <MyProfileBgImg userObj={userObj}/>
    <form className='profile_edit_form' onSubmit={onSubmit}>
        <fieldset>
            <legend className='blind'>profile edit</legend>
            <section className="profile">
                <h2 className="blind">My profile info</h2>
                <div className="profile_img empty">                       
                    <img src={newPhotoURL} alt="newPhotoURL" name="photoImg" />
                    <div className='profile_img_edit'>
                        {newPhotoURL && (
                            <div className='profile_img_remove' onClick={imgDelete}>
                                Remove
                            </div>
                        )}
                        <label htmlFor="profile_img" className='profile_img_add'>addphoto</label>
                        <input type="file" id='profile_img' onChange={onFileChange} accept='image/*' name='profileImg' style={{opacity:0}}/>  
                    </div> 
                </div>
                <div className="profile_cont">
                    <input type="text" className="profile_name" name='name' value={newDisplayName} onChange={onChange} autoFocus />
                    {/* <input type="text" className="profile_email" name='message' value={message} onChange={onChange} /> */}
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
                            <label htmlFor="profile_submit" className='profile_submit'>
                                <span className="icon">
                                    <FaPencilAlt />
                                </span>
                                    Edit Profile
                            </label>
                            <input type="submit" id='profile_submit' value="프로필 바꾸기" style={{opacity:0}}/>
                        </li>
                    </ul>
                </div>
            </section>
        </fieldset>
    </form>
</main>

</div>
  )
}

export default MyProfileDetail