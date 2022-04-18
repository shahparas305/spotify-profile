import React from 'react'
import SpotifyIcon from './assets/spotify-icon.png'
import {Link} from 'react-router-dom'
import IconUser from './assets/user'
import IconMicrophone from './assets/microphone'
import IconMusic from './assets/music'
import IconTime from './assets/time'
import IconPlaylist from './assets/playlist'
import {FaGithub} from 'react-icons/fa'


function Navbar() {
  return (
    <div className='navbar'>
        <div className='navbar__logo--c'>
          <img className='navbar__logo' src={SpotifyIcon}></img>
        </div>
        <div className='navbar__links'>
            <Link to='/'>
                <div className='navbar__link__item one'>
                    <IconUser className="navbar__profile__icon"/>
                    <div className='navbar__link'>Profile</div>
                </div>
            </Link>
            <Link to='/artists'>
                <div className='navbar__link__item two'>
                    <IconMicrophone className="navbar__profile__icon"/>
                    <div className='navbar__link'>Artists</div>
                </div>
            </Link>
            <Link to='/tracks'>
                <div className='navbar__link__item three'>
                    <IconMusic className="navbar__profile__icon"/>
                    <div className='navbar__link'>Tracks</div>
                </div>
              </Link>
              <Link to='/recent'>
                <div className='navbar__link__item four'>
                    <IconTime className="navbar__profile__icon"/>
                    <div className='navbar__link'>Recent</div>
                </div>
              </Link>
              <Link to='/playlists'>
                <div className='navbar__link__item five'>
                    <IconPlaylist className="navbar__profile__icon"/>
                    <div className='navbar__link'>Playlists</div>
                </div>
              </Link>   
        </div>
        <FaGithub className='navbar__github__logo'/>
    </div>
  )
}

export default Navbar