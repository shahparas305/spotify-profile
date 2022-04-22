import React from 'react'
import TrackList from '../components/TrackList'
import Button from '../components/Button'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Loading from '../components/Loading/Loading'


function PlaylistOverview({token, logout}) {
  const location = useLocation()
  const { id } = location.state
  let [playlistInfoState, setPlaylistInfoState] = useState()
  let [playlistTracksState, setPlaylistTracksState] = useState()
  let playlistInfo = {}
  let playlistTracks = []
  
  const getPlaylistInfo = async () => {
    const {data} = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).catch(err => logout());
    playlistInfo = {
      image: data.images[0].url,
      title: data.name,
      desc: data.description,
      tracksNum: data.tracks.total,
      author: data.owner.display_name
    }
    console.log(playlistInfo)
    setPlaylistInfoState(playlistInfo)

    data.tracks.items.forEach((i) => {
      playlistTracks.push({
        image: i.track.album.images[0].url,
        title: i.track.name,
        artist: i.track.artists[0].name,
        album: i.track.album.name,
        length: i.track.duration_ms,
        id: i.track.id
      })
    })
    console.log(playlistTracks)
    setPlaylistTracksState(playlistTracks)
  }

  useEffect(() => {
    getPlaylistInfo()
  }, [])

  if (!playlistInfoState) {
    return <Loading/>;
  } else {
    if (!playlistTracksState) {
      return <Loading/>;
    } else {
  return (
    <div className='playlistoverview__container'>
        <div className='playlistoverview__left__contents'>
          <div className='playlistoverview__left'>
          <div className='playlistoverview__img--c'>
            <img className='playlistoverview__img' src={playlistInfoState.image}></img>
          </div>
          <div className='playlistoverview__title'>{playlistInfoState.title}</div>
          <div className='playlistoverview__author'>By {playlistInfoState.author}</div>
          <div className='playlistoverview__desc'>{playlistInfoState.desc}</div>
          <div className='playlistoverview__tracks__num'>{playlistInfoState.tracksNum} Tracks</div>
          <Button text={'Get Recommendations'} color={'green'}></Button>
          </div>
        </div>

        <div className='playlistoverview__right'>
          <TrackList songs={playlistTracksState}/>
        </div>
    </div>
  )
}
}
}

export default PlaylistOverview
