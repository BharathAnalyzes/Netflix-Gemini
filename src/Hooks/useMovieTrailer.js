import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";


const useMovieTrailer = (movieId) =>{
   // fetching the trailer videom and updating the store with trailer video
  const dispatch=useDispatch();
  const getMovieVideos= async () =>{
        const data=await fetch('https://api.themoviedb.org/3/movie/'+movieId+'/videos?language=en-US', API_OPTIONS);
        const json =await data.json();
        // console.log("Movies videos",json);
        const Filteredtrailers =json.results.filter((video)=>video.type === "Trailer");
        // trailer exists take first trailer else take first item from results
        const trailer = Filteredtrailers.length ? Filteredtrailers[0] : json.results[0] ;
        //console.log("trailer",trailer);
        dispatch(addTrailerVideo(trailer));
} 

useEffect(()=>{
  getMovieVideos();
},[]);
};

export default useMovieTrailer;