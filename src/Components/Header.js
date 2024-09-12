
import {auth} from "../utils/firebase"
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addUser,removeUser } from "../utils/userSlice";
import { NETFLIX_LOGO } from "../utils/constants";
const Header=()=>{
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const user=useSelector(store=>store.user);
  const HandleSignOut=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      //navigate("/");
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth, (user) => {
      if (user) {
        // signed in
        const {uid, email,displayName,photoURL}= user;
        dispatch(addUser({
          uid : uid,
          email :email,
          displayName :displayName,
          photoURL : photoURL,
        })); 
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
      });
      // unsubscribe will be called when my component un-mounts
      return ()=>unsubscribe();
      },[]);
    return(
      <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img className="w-44"
        src={NETFLIX_LOGO}
        alt="netflix-logo"/>
        { user &&   <div className="flex p-2">
          <img className="w-12 h-12"
            alt="userIcon"
            src={user.photoURL}
           />
           {/* <FontAwesomeIcon className="w-12 h-12" icon={faUser} alt="userIcon" /> */}
           <button className="font-bold text-white" 
            onClick={HandleSignOut}>Sign-out</button>
        </div>}
      </div>
    )
}
export default Header;