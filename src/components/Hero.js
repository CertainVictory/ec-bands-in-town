import React, {useState, useEffect} from 'react';
import './../SearchStyles.css';
import verifiedLogo from '../svg-assets/verifiedLogo.svg';


export default function Hero(data){
  const [buttonText, setButtonText] = useState('Follow');
  const artistData = data.data;

  return(
    <div className='heroContainer'>
      <div className='profileContainer'>
        <div className='profileDetails'>
          <img className='profileImg' src={artistData?.thumb_url} alt=""/>
          <div className='artistInfo'>
            <h1 className='artistName'>
              {artistData?.name}
              {artistData?.tracker_count > 100 ? <img src={verifiedLogo}/> : <span></span>} 
            </h1>
            <div className='followerCount'>
              {artistData?.tracker_count.toLocaleString('en-US')}  Followers
            </div>
          </div>
        </div>
        <div>
          <div className='followButton' onClick={() => setButtonText((currentState) =>  currentState === 'Unfollow'  ? 'Follow' : 'Unfollow'  )}
          >{buttonText}</div>
        </div>
      </div>
      <div className='backgroundHero'>
        <img src={artistData?.thumb_url} alt=""/>
      </div>
    </div>
  );
}