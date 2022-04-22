import React, {useEffect, useState} from 'react'
import TrackList from '../components/TrackList'
import axios from 'axios'
import Loading from '../components/Loading/Loading'




function Recent({token, logout}) {
  let [songs, setSongs] = useState()
  let songsArray = []


  const getRecentTracks = async (e) => {
    const {data} = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).catch(err => logout());
    data.items.forEach((i) => {
      songsArray.push({
        //artists, name, song image, song album, duration
       title: i.track.name,
       image: i.track.album.images[0].url,
       album: i.track.album.name,
       length: i.track.duration_ms,
       artist: i.track.artists[0].name,
       id: i.track.id
      })
    });
    setSongs(songsArray)
  }

useEffect(() => {
  getRecentTracks();
},[])

if (!songs) {
  return <Loading/>;

} else {
  return (
    <div className='recent__main__container'>
      <h2 className='page__title'>Recently Played Tracks</h2>
      <div className='tracklist__container'>
        <TrackList songs={songs}/>
      </div>
    </div>
  )
}
  

  
  


}

export default Recent
