import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies=useSelector(s=>s.movies);
  return (
    movies?.nowPlayingMovies && 
    <div className='bg-black'>
      <div className='-mt-80 pl-12 relative z-20'>
          <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
          <MovieList title={"Popular"} movies={movies?.popularMovies} />
          <MovieList title={"Top Rated Movies"} movies={movies?.topRatedMovies} />
          <MovieList title={"Up-Coming Movies"} movies={movies?.upcomingMovies} />
      </div>
    </div>
  )
}

export default SecondaryContainer;