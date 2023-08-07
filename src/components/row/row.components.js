import React, { useState, useEffect } from 'react'
import axios from '../../axios/axios.js';
import './row.styles.css'
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const baseUrl = "https://image.tmdb.org/t/p/original/"

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("");


    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl])
    
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

    const handleClick = (movie) => {
        
        if (trailerUrl){
            setTrailerUrl('');
        }else{
            movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
            .then(url => {
                
                // This is Trick To Find the Key From URL Search Means (?) After Question mark Search Means
                const urlParams = new URLSearchParams(new URL(url).search);
                console.log(urlParams)
                setTrailerUrl(urlParams.get('v'));
            }).catch(error => {
                console.log(error)
            })
        }
    }

    return (
        <div className="row">
           <h2 className="row__title">{title}</h2> 
            <div className="row__posters" >
                {
                    movies.map(movie => (
                        <img 
                        className={`row__poster ${isLargeRow ? "row__posterLarge" : null } `}
                        key={movie.id} 
                        onClick={() => handleClick(movie)}
                        src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name} 
                        />
                    ))
                }
           </div>
           {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
