import React, {useState, useCallback} from 'react';
import axios from 'axios';
import './../SearchStyles.css';
import Hero from './Hero';
import searchLogo from '../svg-assets/searchLogo.svg';
import bands from '../svg-assets/bands.svg';

export default function Search(){
  const [artistData, setArtistData] = useState(null);
  
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 1000);
    };
  };

  //referenced a w3 school link for debounce

  const handleChange = async (searchTerm) => {
    try{
      if(searchTerm !==null && searchTerm.length > 0 ){
        await axios.get(`https://rest.bandsintown.com/artists/${searchTerm}?app_id=test`)
          .then((apiData) => 
            setArtistData(apiData),
          );
      }
      console.log(artistData, 'in searchfunc');
    } catch (error){
      console.error(error);
    }
  };

  const optimizedFn = useCallback(debounce(handleChange), []);

  return(
    <>
      <div className='SearchStyles'>
        <img className='bandsLogo' src={bands}/>
        <div className='inputContainer'>
          <img src={searchLogo}/><input
            type="text"
            placeholder={'Search for artists'}
            onChange={()=>
            {
              window.addEventListener('keydown', (e) => {
                const trimmedSearchTerm = e.target.value.trim();
                if(e.key === 'Enter' && trimmedSearchTerm){
                  optimizedFn(trimmedSearchTerm);
                }
              });}}
          />
        </div>
        {artistData ?
          <div className='SearchStyles'>
            <Hero data={artistData.data}/>  
          </div> 
          : <div>Search for you favorite Artist</div>
        }
      </div>
    </>
  );
}