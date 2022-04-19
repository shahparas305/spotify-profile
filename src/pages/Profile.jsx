import React, {useEffect, useState} from 'react'
import IconUser2 from '../components/assets/user2'
import Button from '../components/Button'
import TrackList from '../components/TrackList'
import ArtistList from '../components/ArtistList'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Loading from '../components/Loading/Loading'

let userData = {}
let playlistsNum = ''
let following = ''

function Profile({token, logout}) {
  let [tracks, setTracks] = useState();
  let [artists, setArtists] = useState();
  let [userDataState, setUserDataState] = useState()
  let [playlistNumState, setPlaylistNumState] = useState()
  let [followingState, setFollowingState] = useState()
  let tracksList = []
  let artistsList = []
  let artistImage = ''
  let userImage = ''

  const getPlaylistsNum = async () => {
    const {data} = await axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).catch(err => logout());
    playlistsNum = data.total
    setPlaylistNumState(playlistsNum)
  }

  const getFollowingArtists = async () => {
    const {data} = await axios.get('https://api.spotify.com/v1/me/following?type=artist', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    following = data.artists.total
    setFollowingState(following)
  }

  const getUserData = async () => {
    const {data} = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    //Display name, followers, images 
    if((data.images).length === 0) {
      userImage = 'icon'
    } else {
      userImage = data.images[0].url
    }

    userData = {
      username: data.display_name,
      followers: data.followers.total,
      image: userImage
    }
    setUserDataState(userData)
  }

  const getTopArtists10 = async (e) => {
    const {data} = await axios.get('https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=10', {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    data.items.forEach((i) => {

      if(!i.images[0]) {
        artistImage = ''
      } else {
        artistImage = i.images[0].url
      }

      artistsList.push({
        name: i.name,
        image: artistImage,
        id: i.id
      })
    })
    setArtists(artistsList)
  }

  const getTopTracks10 = async (e) => {
    const {data} = await axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10', {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    data.items.forEach((i) => {
      tracksList.push({
        //title, album, artist, length, image
        title: i.name,
        image: i.album.images[0].url,
        artist: i.artists[0].name,
        album: i.album.name,
        length: i.duration_ms,
        id: i.id
      })
    })
    setTracks(tracksList)
  }

  useEffect(() => {
    getPlaylistsNum();
    getTopArtists10();
    getTopTracks10();
    getUserData();
    getFollowingArtists();
  }, [])
  

  if (!tracks) {
    return <Loading/>;
  } else {
    if(!artists) {
      return <Loading/>
    } else {
      if(!userDataState) {
        return <Loading/>
      } else {
        if(!playlistNumState) {
          return <Loading/>
        } else {
          if(!followingState) {
            return <Loading/>
          } else {
  return (
    <div className='profile__main__container'>
      <div className='profile__header'>
        <div className='profile__pic__container'>
          {userData.image === 'icon' ? <IconUser2 className='profile__icon'/> : <img className='profile__pic' src={userData.image}></img>}
        </div>
        <h1 className='profile__username'>{userData.username}</h1>
        <div className='profile__stats'>
          <div className='profile__stats__item'>
            <div className='profile__stats__num'>{userData.followers}</div>
            <div className='profile__stats__label'>Followers</div>
          </div>
          <div className='profile__stats__item'>
            <div className='profile__stats__num'>{followingState}</div>
            <div className='profile__stats__label'>Following</div>
          </div>
          <div className='profile__stats__item'>
            <div className='profile__stats__num'>{playlistNumState}</div>
            <div className='profile__stats__label'>Playlists</div>
          </div>
        </div> 
        <div onClick={logout}><Button text={'Logout'} color={'gray'}/></div>
      </div>
      <div className='profile__body'>
        <div className='profile__grid__container'>
          <div className='profile__artists__list'>
            <div className='profile__artists__header'>
              <div className='profile__artists__title'>Top Artists of All Time</div>
              <Link to='/artists'><Button text={'See more'} color={'gray'}/></Link>
            </div>
            <ArtistList artistsArray={artists} type={'list'}/>
          </div>
          <div className='profile__tracks__list'>
            <div className='profile__tracks__header'>
              <div className='profile__tracks__title'>Top Tracks of All Time</div>
              <Link to='/tracks'><Button text={'See more'} color={'gray'}/></Link>
            </div>
            <TrackList songs={tracks}/>
          </div>
        </div>
      </div>
    </div>
  )
}
}
}
}
}
}
export default Profile
