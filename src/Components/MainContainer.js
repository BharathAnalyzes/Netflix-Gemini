import React from 'react'
import { useSelector } from 'react-redux'
import VideoBackGround from './VideoBackGround'
import VideoTitle from './VideoTitle'
const MainContainer = () => {
    const movies=useSelector(store=>store.movies?.nowPlayingMovies);
    // 2. adding if by checking null
    if (movies===null) {
        return
    }
    const mainMovie=movies[0]; // 1. trying to acces before store executes 
    //console.log("main movie",mainMovie);
    const {original_title,overview,id} =mainMovie;
  return (
    <div>
        <VideoTitle title={original_title} overview={overview}/>
        <VideoBackGround movieId={id}/>
        
    </div>
  )
}

export default MainContainer