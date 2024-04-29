import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
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
  }

  async componentDidMount() {
    const favortiteSongs = await getFavoriteSongs();
    this.changeStateFavoriteSongs(favortiteSongs);
  }

  changeStateFavoriteSongs(arg) {
    const TIMEOUT = 1000;
    setTimeout(() => this.setState({
      loading: false,
      requestFavoriteSongs: [... arg],
    }), TIMEOUT);
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading && <MessageCharging />}
      </div>);
  }
}

export default Favorites;
