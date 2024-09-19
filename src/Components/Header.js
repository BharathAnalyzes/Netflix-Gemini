
import {auth} from "../utils/firebase"
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addUser,removeUser } from "../utils/userSlice";
import { NETFLIX_LOGO, SUPPORTED_LANGUAGE } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import {changeLanguage} from "../utils/configSlice"
const Header=()=>{
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const user=useSelector(store=>store.user);
  const ShowGptSearch= useSelector(s=>s.gpt.showGptSearch)

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

      const handleGptSearch=()=>{
        // toggle
        dispatch(toggleGptSearchView());
      }
    const handleLanguageChange =(e)=>{
      dispatch(changeLanguage(e.target.value));
    }

    return(
      <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img className="w-44"
        src={NETFLIX_LOGO}
        alt="netflix-logo"/>
        { user && 
          <div className="flex p-2">
            {ShowGptSearch && <select onChange={handleLanguageChange}
             className="p-2 m-2 bg-gray-900 text-white rounded-lg">
              {SUPPORTED_LANGUAGE.map(lang => 
                  <option  key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
              )}
            </select>}
            <button className="py-2 px-4 mx-4 my-2 text-white bg-purple-800 rounded-lg"
              onClick={handleGptSearch}
              >{ShowGptSearch ?"HomePage" : "Gpt-Search"}
            </button> 
            <img className="w-12 h-12"
                alt="userIcon"
                src={user.photoURL}
              />     
              <button className="font-bold text-white" 
              onClick={HandleSignOut}>Sign-out</button>
        </div>}
      </div>
    )
}
export default Header;