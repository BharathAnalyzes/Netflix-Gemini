import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({title,movies}) => {
    console.log("MovieList",movies)
  return (
    <div className='px-6'>
        <h1 className='text-3xl py-4  text-white'>{title}</h1>
        <div className='flex overflow-x-scroll'>
            <div className='flex'>
                {movies?.map(m => 
                    <MovieCard key={m?.id} posterPath={m?.poster_path}/>
                )}
            </div>
        </div>
    </div>
    
  )
}

export default MovieList
