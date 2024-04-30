import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MessageCharging from './MessageCharging';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      requestFavoriteSongs: [],
    };
    this.changeStateFavoriteSongs = this.changeStateFavoriteSongs.bind(this);
    this.changeStateRemoveFavoriteSongs = this.changeStateRemoveFavoriteSongs.bind(this);
  }

  async componentDidMount() {
    const favortiteSongs = await getFavoriteSongs();
    this.changeStateFavoriteSongs(favortiteSongs);
  }

  changeStateFavoriteSongs(arg) {
    const TIMEOUT = 1000;
    setTimeout(
      () => this.setState({
        loading: false,
        requestFavoriteSongs: [...arg],
      }),
      TIMEOUT,
    );
  }

  async changeStateRemoveFavoriteSongs(arg) {
    const { trackId } = arg;
    removeSong({ trackId });
    // console.log(await getFavoriteSongs());
    // this.setState({
    //   show: false,
    // });
  }

  render() {
    const { loading, requestFavoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading && <MessageCharging />}
        {requestFavoriteSongs.map((music, index) => (
          <MusicCard
            key={ index }
            trackName={ music.trackName }
            trackId={ music.trackId }
            previewUrl={ music.previewUrl }
            requestFavoriteSongs={ requestFavoriteSongs }
            changeStateRemoveFavoriteSongs={ this.changeStateRemoveFavoriteSongs }
          />
        ))}
      </div>
    );
  }
}

export default Favorites;
