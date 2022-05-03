import React from 'react'
import Button from '../components/Button'

function LogIn() {
    const CLIENT_ID = 'daf189e0ddd44fe58d14e311153307e3'
    const REDIRECT_URI = 'https://spotify305.netlify.app'
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
    const RESPONSE_TYPE = "token"
    const SCOPES = 'user-top-read%20user-read-recently-played%20playlist-read-private%20user-follow-read'

    return (
        <div className='login'>
            <div className='login__title'>Spotify Profile</div>
            <a className="login__link" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`}>
                <Button className='login__button' text={'Log in to Spotify'} color={'green'}/>
            </a>
        </div>
    )
}

export default LogIn
