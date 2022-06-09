import axios from "./axios";
import React, { useEffect, useState } from "react";
import './row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const baseURL = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl,islarge }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl,setTrailerUrl]=useState("");
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  const opts={
    height:"390",
    width:"100%",
    playerVars:{
    autoPlay:1,
    },
  };
  const handleClick=(movie)=>{
    if(trailerUrl){
      setTrailerUrl('');
    }else{
      movieTrailer(movie?.name || "")
      .then((url)=>{
        const urlParams=new URLSearchParams(new URL(url).search);
       setTrailerUrl(urlParams.get('v'));
      
      }).catch((error)=>{
        console.log(error);
      })
    }
  }
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img 
          key={movie.id}
          onClick={()=>handleClick(movie)}
          className={`row_poster ${islarge && "row_posterLarge"}`} 
          src={`${baseURL}${islarge?movie.poster_path:movie.backdrop_path}`} 
          alt={movie.name}></img>
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}></YouTube>}
    </div>
  );
};

export default Row;