import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import {useDispatch, useSelector} from "react-redux"
import openai from '../utils/openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { API_OPTIONS, OPENAI_KEY } from '../utils/constants';
import Error from './Error';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
   const langKey = useSelector((l)=>l.config.lang);
   const searchtext = useRef(null);
   const dispatch = useDispatch();

  // take movie as input and will search that movie in TMDB 
  const searchMovieTMDB = async (movieName)=>{
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+movieName+'&include_adult=false&language=en-US&page=1', API_OPTIONS)
    const json = await data.json();
     return json.results;
  }




   const handleGptSearch = async ()=>{
     console.log("Search text",searchtext.current.value);
      const GptQuery = "Act as Movies Recommendation system and suggest some movies for the query : " + searchtext.current.value + ". only give me 5 movies, comma seperated like the example result ahead. Example Result: Gadar,sholey,Don,Golmal,Koi Mil Gaya"
       /*
      //make an api call to GPT API to get movie results
      async function main() {
        const gptResults = await openai.chat.completions.create({
          messages: [{ role: 'user', content: GptQuery }],
          model: 'gpt-3.5-turbo',
        });
       // console.log("Gpt results",gptResults.choices);
       if (gptResults && gptResults.choices && gptResults.choices.length > 0) {
        const movieList = gptResults.choices[0].message.content;
        console.log("GPT Results:", movieList);
      } else {
        console.error("No response from GPT:", gptResults);
      }
      };
      main();  */

      // Gemini APII KEY
              const googleAI = new GoogleGenerativeAI(OPENAI_KEY);
              const geminiConfig = {
                temperature: 0.7,  // Adjust for desired creativity vs. accuracy
                topP: 1.0,         // Controls sampling (1.0 for more likely choices)
              };

              const geminiModel = googleAI.getGenerativeModel({
                model: 'gemini-1.5-flash', // Or other suitable model for movie recommendations
                geminiConfig,
              });
              try {
                const gptResults = await geminiModel.generateContent(GptQuery);
                if (!gptResults.response) {
                  return <Error />
                }
                const movieList  = gptResults?.response?.candidates[0]?.content?.parts[0]?.text.split(",");
                console.log('GPT Results:', movieList);

                const promiseArray = movieList.map((movie)=>searchMovieTMDB(movie));
                // the result will be array of promise [promise1, promise2, promise3 ] promise will take some time to return
                const tmdbSearchedResults = await Promise.all(promiseArray);
                console.log('tmdb Searched Results:', tmdbSearchedResults);
                dispatch(addGptMovieResult({movieNames: movieList , movieResults : tmdbSearchedResults}))
              } catch (error) {
                console.error('Error:', error);
              }

   }
        return (
          <div className='pt-[10%] flex justify-center'>
              <form 
                className='w-1/2 bg-black grid grid-cols-12'
                onSubmit={(e)=>e.preventDefault()}>
                  <input 
                    ref={searchtext}
                    type='text' 
                    className='col-span-9 p-4 m-4' 
                    placeholder={lang[langKey].gptSearchPlaceholder} 
                  />
                  <button 
                    className='col-span-3 py-2 px-4 m-4 bg-red-700 text-white'
                    onClick={handleGptSearch}>
                    {lang[langKey].search}

                  </button>
              </form>
          </div>
        )
}

export default GptSearchBar
