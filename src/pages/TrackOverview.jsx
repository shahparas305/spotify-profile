import React from 'react'
import Button from '../components/Button'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Loading from '../components/Loading/Loading'

function TrackOverview({token}) {
  const location = useLocation()
  const { id } = location.state
  let [trackDataState, setTrackDataState] = useState()
  let [audioFeaturesState, setAudioFeaturesState] = useState()
  let trackData = {}
  let trackImage = ''
  let audioFeatures = {}

  function msToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  const getAudioFeatures = async () => {
    const {data} = await axios.get(`https://api.spotify.com/v1/audio-analysis/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    audioFeatures = {
      key: data.track.key,
      modality: data.track.mode,
      time_signature: data.track.time_signature,
      tempo: data.track.tempo,
      bars: (data.bars).length,
      beats: (data.beats).length,
      segments: (data.segments).length,
      sections: (data.sections).length
    }
    setAudioFeaturesState(audioFeatures)
  }

  const getTrack = async () => {
    const {data} = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })

    if((data.album.images).length === 0) {
      trackImage = ''
    } else {
      trackImage = data.album.images[0].url
    }

    trackData = {
      title: data.name,
      artist: data.artists[0].name,
      album: data.album.name,
      image: trackImage,
      year: data.album.release_date,
      link: data.external_urls.spotify,
      popularity: data.popularity,
      duration: data.duration_ms
    }
    setTrackDataState(trackData)
  }

  useEffect(() => {
    getAudioFeatures()
    getTrack()
  }, [])




  if (!trackDataState) {
    return <Loading/>;
  } else {
    if (!audioFeaturesState) {
      return <Loading/>;
    } else {
  return (
    <div className='trackoverview__main__container'>
        <div className='trackoverview__header'> 
          <div className='trackoverview__img__container'>
            <img className='trackoverview__img' src={trackDataState.image}/>
          </div>
          <div className='trackoverview__info'>
            <div className='trackoverview__title'>{trackDataState.title}</div>
            <div className='trackoverview__artist'>{trackDataState.artist}</div>
            <div className='trackoverview__album__year'>{trackDataState.album}&nbsp;&middot;&nbsp;{trackDataState.year}</div>
            <a href={trackDataState.link}><Button color={'green'} text={'Play on Spotify'}/></a>
          </div>
        </div>
        <div className='trackoverview__grid'>
          <div className='trackoverview__grid__item'>
            <div className='trackoverview__grid__value'>{msToMinutesAndSeconds(trackDataState.duration)}</div>
            <div className='trackoverview__grid__label'>Duration</div>
          </div>
          <div className='trackoverview__grid__item'>
            <div className='trackoverview__grid__value'>{audioFeaturesState.key}</div>
            <div className='trackoverview__grid__label'>Key</div>
          </div>
          <div className='trackoverview__grid__item'>
            <div className='trackoverview__grid__value'>{audioFeaturesState.modality}</div>
            <div className='trackoverview__grid__label'>Modality</div>
          </div>
          <div className='trackoverview__grid__item'>
            <div className='trackoverview__grid__value'>{audioFeaturesState.time_signature}</div>
            <div className='trackoverview__grid__label'>Time Signatures</div>
          </div>
          <div className='trackoverview__grid__item'>
            <div className='trackoverview__grid__value'>{Math.round(audioFeaturesState.tempo)}</div>
            <div className='trackoverview__grid__label'>Tempo (BPM)</div>
          </div>
          <div className='trackoverview__grid__item'>
            <div className='trackoverview__grid__value'>{trackDataState.popularity}%</div>
            <div className='trackoverview__grid__label'>Popularity</div>
          </div>
          <div className='trackoverview__grid__item'>
            <div className='trackoverview__grid__value'>{audioFeaturesState.bars}</div>
            <div className='trackoverview__grid__label'>Bars</div>
          </div>
          <div className='trackoverview__grid__item'>
            <div className='trackoverview__grid__value'>{audioFeaturesState.beats}</div>
            <div className='trackoverview__grid__label'>Beats</div>
          </div>
          <div className='trackoverview__grid__item'>
            <div className='trackoverview__grid__value'>{audioFeaturesState.sections}</div>
            <div className='trackoverview__grid__label'>Sections</div>
          </div>
          <div className='trackoverview__grid__item'>
            <div className='trackoverview__grid__value'>{audioFeaturesState.segments}</div>
            <div className='trackoverview__grid__label'>Segments</div>
          </div>
        </div>
    </div>
  )
}
}
}
export default TrackOverview