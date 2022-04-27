import React from 'react'
import IconInfo from './assets/info'
import {Link} from 'react-router-dom'
import blackimage from './assets/blackimage3.jpg'

function Artist({ artist, type }) {
    const {name, image, id} = artist

    let idString = id

    if (type === 'list') {
        return (
            <Link className='artist__link' to='/overview' state={{ id: idString }}>
                <div className='artist__container__list'>
                    <img className='artist__img__list' src={image}/>
                    <div className='artist__name__list'>{name}</div>
                </div>
            </Link>
          )
    }

    if (type === 'grid') {
        return (
            <div className='artistitem'>
                <Link to='/overview' state={{ id: idString }}>
                    <div className='artist__img__grid--c'>
                        {image ? <img className='artist__img__grid' src={image}/> : <img className='artist__img__grid' src={blackimage}/>}
                        <div className='infoicon--c'>
                            <IconInfo></IconInfo>
                        </div>
                    </div>
                </Link>
                <div className='artist__name__grid'>{name}</div>
            </div>
        )
    }
  
}

export default Artist

