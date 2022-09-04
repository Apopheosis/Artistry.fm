import './App.css';
import Home from './components/Home';
import SearchBar from './components/SearchBar';
import ArtistPage from "./components/ArtistPage";
import AlbumPage from "./components/AlbumPage";
import TrackPage from "./components/TrackPage"
import {Route, Routes} from "react-router-dom";
import Navigation from "./components/Navigation";

function App() {
  return(
    <div className = "App">
        <Navigation />
        <Routes>
            <Route path = "/artists" element={<ArtistPage />} />
            <Route path = "/tracks" element={<TrackPage />} />
            <Route path = "/albums" element={<AlbumPage />} />
        </Routes>
    </div>

  );
  }

export default App;
