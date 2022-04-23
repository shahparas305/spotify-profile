import React from 'react'
import beatbox from './assets/beatbox.jpg'
import Track from './Track'

function TrackList({songs}) {

  return (

    <div className="tracklist5">
        {songs.map((track) => (
            <Track key={track.id} track={track}/>
        ))}
    </div>
  )
}

export default TrackList
