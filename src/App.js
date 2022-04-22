import { useEffect, useState } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Artists from './pages/Artists';
import Playlists from './pages/Playlists';
import Recent from './pages/Recent';
import Tracks from './pages/Tracks';
import NotFound from './pages/NotFound';
import ArtistOverview from './pages/ArtistOverview';
import TrackOverview from './pages/TrackOverview';
import PlaylistOverview from './pages/PlaylistOverview'
import LogIn from './pages/LogIn';
import Loading from './components/Loading/Loading';

function App() {
  const [token, setToken] = useState('')

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem('token')

    if(!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith('access_token')).split("=")[1]

      window.location.hash = ''
      window.localStorage.setItem("token", token)
    }

    setToken(token)

  }, [])

  const logout = () => {
    setToken('')
    localStorage.clear();
    window.localStorage.removeItem('token')
  }
  
  return (
    <Router>
      {!token ? 
        <LogIn/>
      : <div className="App">

          <Navbar></Navbar>

          <main className='container'>
            <Routes>
              <Route path='/' element={<Profile logout={logout} token={token}/>}></Route>
              <Route path='/tracks' element={<Tracks logout={logout} token={token} />}></Route>
              <Route path='/artists' element={<Artists logout={logout} token={token} />} />
              <Route path='/recent' element={<Recent logout={logout} token={token} />}></Route>
              <Route path='/playlists' element={<Playlists logout={logout} token={token}/>}></Route>
              <Route path='/overview' element={<ArtistOverview logout={logout} token={token}/>}></Route>
              <Route path='/track' element={<TrackOverview logout={logout} token={token}/>}></Route>
              <Route path='/playlistoverview' element={<PlaylistOverview logout={logout} token={token}/>}></Route>
              <Route path='/*' element={<NotFound/>}></Route>
            </Routes>
          </main>
        </div>}
    </Router>
  );
}

export default App;
