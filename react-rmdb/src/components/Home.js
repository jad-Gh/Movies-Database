//API
import API from '../API';
//config
import {POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL} from '../config';
//components
import HeroImage from './HeroImage/index';
import Grid from './Grid/Index';
import Thumb from './Thumb/index';
import Spinner from './Spinner/Index';
//Hook
import { useState, useEffect } from 'react';
import{useHomeFetch} from '../hooks/useHomeFetch';

//image
import NoImage from '../images/no_image.jpg';
import SearchBar from './SearchBar';

const Home = () => {
    const {state,loading,error,searchTerm, setSearchTerm} = useHomeFetch();
   
    console.log(state);

    return ( 
        <>
        { !searchTerm && state.results[0] &&
        <HeroImage 
        image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
        title ={state.results[0].original_title}
        text={state.results[0].overview}
        />

        } 

        <SearchBar setSearchTerm={setSearchTerm}/>

        <Grid header={searchTerm? 'Search Result':'popular movies'} 
        children={
            state.results.map(movie => (
                <Thumb key={movie.id} clickable
                image={movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : NoImage}
                movieId={movie.id}
                />
            ) )
        }/>  
        <Spinner />

        </>
     );
}
 
export default Home;