import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Loading from '../components/Loading/Loading'



function Playlists({token}) {
  let [playlist, setPlaylist] = useState()
  let playlistArray = []

  const getPlaylists = async (e) => {
    const {data} = await axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    data.items.forEach((i) => {
      playlistArray.push({
        name: i.name,
        image: i.images[0].url,
        tracksNum: i.tracks.total,
        id: i.id,
      })
    });
    setPlaylist(playlistArray)
  }

  useEffect(() => {
    getPlaylists();
  }, [])

  if (!playlist) {
    return <Loading/>;
  } else {
  return (
    <div  className='playlists__main__container'>
      <h2 className='page__title'>Playlists</h2>
      <div className='playlists__container'>
        {playlist.map((playlist) => (
            <div className='playlist__item'>
              <Link to='/playlistoverview' state={{ id: playlist.id }}>
                <div className='playlist__img--c'>
                  <img className='playlist__img' src={playlist.image}/>
                </div>
                <div className='playlist__title'>{playlist.name}</div>
              </Link>
              <div className='playlist__track_num'>{playlist.tracksNum + ' Tracks'}</div>
            </div>  
        ))}
      </div>
    </div>
  )
}
}

export default Playlists