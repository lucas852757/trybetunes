import React from 'react';
// import { getMusics } from '../services/musicsAPI';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import MessageCharging from './MessageCharging';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      show: false,
      artistName: '',
      collectionName: '',
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
    const { artistName, collectionName } = arg[0];
    this.setState({
      artistName,
      collectionName,
      requestHTTP: [...arg],
    });
  }

  changeStateFavoriteSongs(arg) {
    this.setState({
      requestFavoriteSongs: [...arg],
    });
  }

  changeState() {
    const MAGICNUMBER = 1000;
    setTimeout(
      () => this.setState({ loading: false, show: true }),
      MAGICNUMBER,
    );
  }

  render() {
    const {
      artistName,
      collectionName,
      requestHTTP,
      show,
      loading,
      requestFavoriteSongs,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading && <MessageCharging />}
        {show && (
          <>
            <div data-testid="album-name">{collectionName}</div>
            <div data-testid="artist-name">{artistName}</div>
            {requestHTTP
              .filter(({ kind }) => kind)
              .map(({ trackName, previewUrl, trackId }, index) => (
                <MusicCard
                  key={ index }
                  { ...{ trackName, previewUrl, trackId } }
                  requestFavoriteSongs={ requestFavoriteSongs }
                />
              ))}
          </>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(Object).isRequired,
};

export default Album;
