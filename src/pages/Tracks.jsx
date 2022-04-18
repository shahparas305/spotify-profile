import React, {useEffect, useState} from 'react'
import TrackList from '../components/TrackList'
import Loading from '../components/Loading/Loading'
import axios from 'axios'


function Tracks({token}) {
  let [tracks, setTracks] = useState()
  let tracksList = [] 

  const getTopTracks = async (e) => {
    const {data} = await axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=long_term', {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    console.log(data)
    data.items.forEach((i) => {
      tracksList.push({
        //title, album, artist, length, image
        title: i.name,
        image: i.album.images[0].url,
        artist: i.artists[0].name,
        album: i.album.name,
        length: i.duration_ms,
        id: i.id
      })
    })
    setTracks(tracksList)
    console.log(tracksList)
  }



  useEffect(() => {
    getTopTracks()
  }, [])

  if (!tracks) {
    return <Loading/>;
  
  } else {
  return (
    <div className='tracks__main__container'>
      <h2 className='page__title'>Top Tracks</h2>
      <div className='tracklist__container'>
        <TrackList songs={tracks}/>
      </div>
    </div>
  )
}
}

export default Tracks