import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/Validate';
import {  createUserWithEmailAndPassword ,signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "../utils/firebase"
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { LOGO, USER_AVATAR } from '../utils/constants';
const Login = () => {

    const [isSignInForm,setSignInForm]=useState(true);
    const [errorMessage,seterrorMessage]=useState();
    const dispatch=useDispatch();

    const email=useRef(null);
    const password=useRef(null);
    const name=useRef(null);


    const handleButtonClick=()=>{
        //console.log(email.current.value);
        //console.log(password.current.value);
        const message=checkValidData(email.current.value,password.current.value,isSignInForm ? null :name.current.value);
        //console.log(message);
        seterrorMessage(message);

        if (message ) {
           return;
        }
      // perform sign in/ signup logic
      if (!isSignInForm) {
        //sign up logic
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            updateProfile(user, {
              displayName: name.current.value, photoURL: USER_AVATAR,
            }).then(() => {
              // Profile updated!
              // gor displayName and Photo URl we are updating store once again(dispatching an action again)
              //first time sign-up photourl and display name are null so we are dispatching the items once we sign-up
              const {uid, email,displayName,photoURL}= user;
              dispatch(addUser({
                uid : uid,
                email :email,
                displayName :displayName,
                photoURL : photoURL,
              }));
              //console.log(user);
              //navigate("/browse"); in header on state change 
            }).catch((error) => {
              // An error occurred
              seterrorMessage(errorMessage);
            });
            
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            seterrorMessage(errorCode +"-"+errorMessage);
            //navigate("/");
          });
      } 
      else {
          //sign in logic
          signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
              // console.log(user); header authchange will take take everythingh
              // navigate("/browse");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              seterrorMessage(errorCode +"-"+errorMessage);
              //navigate("/");
            });

      }





    }
    const toggleSignInForm=()=>{
        setSignInForm(!isSignInForm);
    }
  return (
    <div>
      <Header/>
      <div className="absolute">
           <img src={LOGO} 
             alt="logo" />
        </div>
        <form className="w-3/12 p-12 bg-black absolute my-36 mx-auto right-0 left-0 text-white bg-opacity-80"
              onSubmit={(e)=>e.preventDefault()}>
            <h1 className="font-bold text-3xl py-4 ">{isSignInForm ?"Sign In" : "Sign Up"}</h1>
            
            {!isSignInForm && <input
                ref={name}
                type="text"
                placeholder="Full Name" 
                className="p-4 my-4 w-full  bg-gray-700 rounded-lg" />}

            <input ref={email}
                type="text"
                placeholder="Email Address" 
                className="p-4 my-4 w-full bg-gray-700 rounded-lg" />

            <input ref={password}
                type="password"
                placeholder="Password" 
                className="p-4 my-4 w-full  bg-gray-700 rounded-lg" />

            <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>

            <button className="p-4 my-6 bg-red-700 w-full rounded-lg "
               onClick={handleButtonClick}>
               {isSignInForm ?"Sign In" : "Sign Up"}</button>

            <p className="py-6 cursor-pointer" onClick={toggleSignInForm}>
               {isSignInForm ?"New to netflix?Sign-up Now" : "Already registered! Sign In now"}
            </p>
        </form>
    </div>
    
  )
}

export default Login
 