import React from 'react'
import { useState } from 'react';
import { authService } from '../firebase';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, GoogleAuthProvider,GithubAuthProvider,signInWithPopup } from "firebase/auth";
import { async } from '@firebase/util';
import { FaCommentDots,FaGoogle,FaGithub } from "react-icons/fa";
import '../styles/auth.scss'


function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true); 
    const [error,setError] = useState("")

    const onChange = (e) => {
        //console.log(e.target.name)
        const {target:{value,name}} = e;
        if("email" === name){
            setEmail(value);
        }else if("password" === name){
            setPassword(value);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
          let data;
          if(newAccount){
              //create newAccount
              data = await createUserWithEmailAndPassword(authService, email, password)
          }else{
              //login
              data = await signInWithEmailAndPassword(authService, email, password)
          }
          //console.log(data);//회원가입을 마친 사용자 정보
        } catch (error) {
          //console.log(error);
          setError(error.message)
        }
      }
    const toggleAccount = () => setNewAccount((prev) => !prev)

    const onSocialClick = (e) =>{
        //console.log(e.target.name)
        const {target:{name}} = e;
        let provider;
        if(name === "google"){
            provider = new GoogleAuthProvider();
        }else if(name === 'github'){
            provider = new GithubAuthProvider();
        }
        const data = signInWithPopup(authService, provider);
        console.log(data);
    }
  return (
<div className='authContainer'>
    <div className='authBrandIcon'>
        <FaCommentDots/>
    </div>
    <form onSubmit={onSubmit} className='container'>
        <input type="email" placeholder='Email' required name='email' value={email} onChange={onChange} className='authInput'/>
        <input type="password" placeholder='Password' required name='password' value={password} onChange={onChange} className='authInput'/>
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} className='authInput authSubmit'/>
        {error && <span className='authError'>{error}</span>}
    </form>
    <span onClick={toggleAccount} className='authSwitch'>
        {newAccount ? "Sign In" : "Create Account"}
    </span>
    <div className='authBtns'>
    <button onClick={onSocialClick} name='google' className='authBtn'>
            Continue with Google<FaGoogle />
        </button>
        <button onClick={onSocialClick} name='github' className='authBtn'>
            Continue with Github<FaGithub />
    </button>
    </div>
</div>
  )
}

export default Auth