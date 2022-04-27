import React, {useRef} from 'react'
import SpotifyIcon from './assets/spotify-icon.png'
import {Link} from 'react-router-dom'
import IconUser from './assets/user'
import IconMicrophone from './assets/microphone'
import IconMusic from './assets/music'
import IconTime from './assets/time'
import IconPlaylist from './assets/playlist'
import IconRecent from './assets/recentsvg.svg'
import {FaGithub} from 'react-icons/fa'


function Navbar() {
  const profile = useRef()
  const artists = useRef()
  const tracks = useRef()
  const recent = useRef()
  const playlists = useRef()


  const changeActiveBtn = (btn) => {
    removeActiveBtn()
    if(btn === "profile") profile.current.classList.add('navbar__btn__active')
    if(btn === "artists") artists.current.classList.add('navbar__btn__active')
    if(btn === "tracks") tracks.current.classList.add('navbar__btn__active')
    if(btn === "recent") recent.current.classList.add('navbar__btn__active')
    if(btn === "playlists") playlists.current.classList.add('navbar__btn__active')
  }

  const removeActiveBtn = () => {
    profile.current.classList.remove('navbar__btn__active')
    artists.current.classList.remove('navbar__btn__active')
    tracks.current.classList.remove('navbar__btn__active')
    recent.current.classList.remove('navbar__btn__active')
    playlists.current.classList.remove('navbar__btn__active')
  }

  return (
    <div className='navbar'>
        <div class="navbar__logo--c">
          <img class="navbar__logo" src={SpotifyIcon} alt=''></img>
        </div>
        <div className='navbar__links'>
          <Link to='/'  ref={profile} class="navbar__link__item navbar__profile navbar__btn__active"  onClick={() => changeActiveBtn('profile')}>
            <IconUser className="navbar__profile__icon"/>
            <div className='navbar__icon__title'>Profile</div>
          </Link>
          <Link to='/artists'  ref={artists} class="navbar__link__item navbar__artists" onClick={() => changeActiveBtn('artists')}>
            <IconMicrophone className="navbar__profile__icon"/>
            <div className='navbar__icon__title'>Artists</div>
          </Link>    
          <Link to='/tracks'  ref={tracks} class="navbar__link__item navbar__tracks" onClick={() => changeActiveBtn('tracks')}>
            <IconMusic className="navbar__profile__icon"/>
            <div className='navbar__icon__title'>Tracks</div>
          </Link>   
          <Link to='/recent'  ref={recent} class="navbar__link__item navbar__recent" onClick={() => changeActiveBtn('recent')}>
            <img src={IconRecent} class="navbar__recent__icon"/>
            <div className='navbar__icon__title'>Recent</div>
          </Link>    
          <Link to='/playlists'  ref={playlists} class="navbar__link__item navbar__playlists" onClick={() => changeActiveBtn('playlists')}>
            <IconPlaylist className="navbar__profile__icon"/>
            <div className='navbar__icon__title'>Playlists</div>
          </Link>
        </div>
        <div className='navbar__github__logo--c'>
          <FaGithub className='navbar__github__logo'/>
        </div>
    </div>
  )
}

export default Navbar
