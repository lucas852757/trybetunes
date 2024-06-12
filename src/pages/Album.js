import React from 'react';
// import { getMusics } from '../services/musicsAPI';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import MessageCharging from './MessageCharging';
import './album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      show: false,
      artistName: '',
      collectionName: '',
      artworkUrl100: '',
      requestHTTP: [],
      requestFavoriteSongs: [],
    };

    this.handleState = this.handleState.bind(this);
    this.changeState = this.changeState.bind(this);
    this.changeStateFavoriteSongs = this.changeStateFavoriteSongs.bind(this);
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const result = await getMusics(id);
    const favortiteSongs = await getFavoriteSongs();

    this.handleState(result);
    this.changeState();
    this.changeStateFavoriteSongs(favortiteSongs);
  }

  handleState(arg) {
    console.log(arg[0]);
    const { artistName, collectionName, artworkUrl100 } = arg[0];
    this.setState({
      artistName,
      collectionName,
      artworkUrl100,
      requestHTTP: [...arg],
    });
  }

  changeStateFavoriteSongs(arg) {
    this.setState({
      requestFavoriteSongs: [...arg],
    });
  }

  changeState() {
    const TIMEOUT = 1000;
    setTimeout(() => this.setState({ loading: false, show: true }), TIMEOUT);
  }

  render() {
    const {
      artistName,
      collectionName,
      artworkUrl100,
      requestHTTP,
      show,
      loading,
      requestFavoriteSongs,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div className="loading">
          {loading && <MessageCharging />}
        </div>

        {show && (
          <main
            style={ {
              display: 'grid',
              gridTemplateColumns: 'auto auto',
              justifyContent: 'space-around',
              marginTop: '50px',

            } }
          >
            <div>
              <img src={ artworkUrl100 } alt="" width="200" height="200" />
              <div data-testid="album-name">{collectionName}</div>
              <div data-testid="artist-name">{artistName}</div>
            </div>
            <div>
              {requestHTTP
                .filter(({ kind }) => kind)
                .map(({ trackName, previewUrl, trackId }, index) => (
                  <MusicCard
                    key={ index }
                    { ...{ trackName, previewUrl, trackId } }
                    requestFavoriteSongs={ requestFavoriteSongs }
                  />
                ))}
            </div>
          </main>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(Object).isRequired,
};

export default Album;
