import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Loading from '../components/Loading/Loading'


let artistData = {}
let array = []

function ArtistOverview({token}) {
  const location = useLocation()
  const { id } = location.state
  let [artistDataState, setArtistDataState] = useState()
  let artistImage = ''
  const hello = ['g', 'f', 'w']

  const getArtist = async () => {
    const {data} = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    // console.log(data)
    if((data.images).length === 0) {
      artistImage = ''
    } else {
      artistImage = data.images[0].url
    }

    artistData = {
      name: data.name,
      followers: data.followers.total,
      image: artistImage,
      genres: data.genres,
      popularity: data.popularity
    }
    // console.log(artistData)
    setArtistDataState(artistData)

    // console.log((artistDataState.genres))
  }

  useEffect(() => {
    getArtist();
  }, [])
  if (!artistDataState) {
    return <Loading/>;
  
  } else {
  return (
    <div className='artistoverview__container'>
      <div className='artistoverview__img__container'>
        <img className='artistoverview__img' src={artistDataState.image}></img>
      </div>
      <div className='artistoverview__title'>{artistDataState.name}</div>
      <div className='artistoverview__stats'>
        <div className='artistoverview__followers__container'>
          <div className='artistoverview__followers__num'>{artistDataState.followers}</div>
          <div className='artistoverview__followers__label'>Followers</div>
        </div>
        <div className='artistoverview__genres__container'>
          {<div className='artistoverview__genres__genre'>{artistDataState.genres[0]}</div>}
          <div className='artistoverview__genres__label'>Genre</div>
        </div>
        <div className='artistoverview__popularity__container'>
          <div className='artistoverview__popularity__num'>{artistDataState.popularity}%</div>
          <div className='artistoverview__popularity__label'>Popularity</div>
        </div>
      </div>
    </div>
  )
}
}

export default ArtistOverview