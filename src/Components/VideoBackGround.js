import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addTrailerVideo } from '../utils/movieSlice';
import useMovieTrailer from '../Hooks/useMovieTrailer';




const VideoBackGround = ({movieId}) => {
  const trailerVideo=useSelector(s=>s.movies?.trailerVideo);
  // fetching the trailer videom and updating the store with trailer video
  useMovieTrailer(movieId);
  return (
    <div className='w-screen'>
      <iframe className='w-screen aspect-video'
          //width="560" height="315"
          src={"https://www.youtube.com/embed/"+trailerVideo?.key + "?autoplay=1&mute=1"}
          title="YouTube video player"
          //frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          //referrerPolicy="strict-origin-when-cross-origin" 
          //allowFullScreen
          >
      </iframe>
    </div>
  )
}

export default VideoBackGround