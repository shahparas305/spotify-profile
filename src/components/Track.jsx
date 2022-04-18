import React from 'react'
import IconInfo from './assets/info'
import {Link} from 'react-router-dom'

function Track({ track }) {
  const {image, title, artist, album, length, id} = track

  let idString = id

  function msToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  return (
    <Link className='track__link' to='/track' state={{ id: idString }}>
        <div className='track__container'>
            <div className='track__left'>
                <div className='track__img__container'>
                    <img className='track__img' src={image}></img>
                    <div className='infoicon--ctrack'>
                            <IconInfo></IconInfo>
                    </div>
                </div>
                <div className='track__info'>
                    <div className='track__title'>{title}</div>
                    <div className='track__artist__album'>{artist}&nbsp; &middot; &nbsp;{album}</div>
                </div>
            </div>
            <div className='track__right'>
                <div className='track__length'>{msToMinutesAndSeconds(length)}</div>
            </div>
        </div>
    </Link>
  )
}

export default Track