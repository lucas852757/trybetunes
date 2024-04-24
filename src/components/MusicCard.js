import React from 'react';
import PropTypes from 'prop-types';
import MessageCharging from '../pages/MessageCharging';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.addFavoriteSong = this.addFavoriteSong.bind(this);
  }

  handleChange({ target }) {
    if (target.checked) {
      const { trackName, previewUrl, trackId } = this.props;
      this.setState(
        {
          loading: true,
          checked: true,
        },
        () => {
          const MAGICNUMBER = 1000;
          setTimeout(
            () => this.addFavoriteSong({ trackName, previewUrl, trackId }),
            MAGICNUMBER,
          );
        },
      );
    } else {
      this.setState({
        checked: false,
      });
    }
  }

  async addFavoriteSong(arg) {
    const addedSong = await addSong(arg);

    if (addedSong === 'OK') {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { checked, loading } = this.state;
    return (
      <>
        {loading && <MessageCharging />}
        <div>{trackName}</div>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="Favorita">
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            checked={ checked }
            onChange={ (event) => this.handleChange(event) }
          />
        </label>
      </>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
