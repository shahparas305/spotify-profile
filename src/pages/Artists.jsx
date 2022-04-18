import React, {useEffect, useState} from 'react'
import ArtistList from '../components/ArtistList'
import axios from 'axios'
import Loading from '../components/Loading/Loading'


function Artists({token}) {
  let [artists, setArtists] = useState()
  let artistsList = []
  let image = ''


  const getTopArtists = async (e) => {
    const {data} = await axios.get('https://api.spotify.com/v1/me/top/artists?time_range=long_term', {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    console.log(data)
    data.items.forEach((i) => {

      if(!i.images[0]) {
        image = ''
      } else {
        image = i.images[0].url
      }

      artistsList.push({
        name: i.name,
        image: image,
        id: i.id
      })
    })
    console.log(artistsList)
    setArtists(artistsList)
  }

  useEffect(() => {
    getTopArtists()
  }, [])

  if (!artists) {
    return <Loading/>;
  
  } else {
  return (
    <div className='artists__main__container'>
      <h2 className='page__title'>Top Artists</h2>
      <div className='artists__grid'>
          <ArtistList artistsArray={artists} type={'grid'}></ArtistList>  
      </div>
      
    </div>
  )
}
}

export default Artists