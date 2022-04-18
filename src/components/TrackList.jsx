import React from 'react'
import beatbox from './assets/beatbox.jpg'
import Track from './Track'

function TrackList({songs}) {

//     const tracks = [
//     {
//         image: beatbox,
//         title: 'Beat Box',
//         artist: 'SpotemGottem',
//         album: 'Beat Box',
//         length: '1:50',
//         id: 1
//     },
//     {
//         image: beatbox,
//         title: 'Beat Box',
//         artist: 'SpotemGottem',
//         album: 'Beat Box',
//         length: '1:50',
//         id: 2
//     },
//     {
//         image: beatbox,
//         title: 'Beat Box',
//         artist: 'SpotemGottem',
//         album: 'Beat Box',
//         length: '1:50',
//         id: 3
//     },
//     {
//         image: beatbox,
//         title: 'Beat Box',
//         artist: 'SpotemGottem',
//         album: 'Beat Box',
//         length: '1:50',
//         id: 4
//     },
//     {
//         image: beatbox,
//         title: 'Beat Box',
//         artist: 'SpotemGottem',
//         album: 'Beat Box',
//         length: '1:50',
//         id: 5
//     },
//     {
//         image: beatbox,
//         title: 'Beat Box',
//         artist: 'SpotemGottem',
//         album: 'Beat Box',
//         length: '1:50',
//         id: 6
//     },
//     {
//         image: beatbox,
//         title: 'Beat Box',
//         artist: 'SpotemGottem',
//         album: 'Beat Box',
//         length: '1:50',
//         id: 7
//     },
//     {
//         image: beatbox,
//         title: 'Beat Box',
//         artist: 'SpotemGottem',
//         album: 'Beat Box',
//         length: '1:50',
//         id: 8
//     },
//     {
//         image: beatbox,
//         title: 'Beat Box',
//         artist: 'SpotemGottem',
//         album: 'Beat Box',
//         length: '1:50',
//         id: 9
//     },
//     {
//         image: beatbox,
//         title: 'Beat Box',
//         artist: 'SpotemGottem',
//         album: 'Beat Box',
//         length: '1:50',
//         id: 10
//     },
// ]


  return (
    // <div>
    //     {tracks.map((track) => (
    //         <Track key={track.id} track={track}/>
    //     ))}
    // </div>

    <div>
        {songs.map((track) => (
            <Track key={track.id} track={track}/>
        ))}
    </div>
  )
}

export default TrackList