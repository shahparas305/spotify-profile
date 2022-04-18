import React from 'react'
import lilbaby from './assets/lilbaby.jpg'
import Artist from './Artist'

function ArtistList({ type, artistsArray }) {

  return (
    <div className={`artistlist__${type}`}>
        {artistsArray.map((artist) => (
            <Artist key={artist.id} artist={artist} type={type}/>
        ))}
    </div>
  )
}

export default ArtistList