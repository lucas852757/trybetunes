import React from 'react';
import PropTypes from 'prop-types';
import MessageCharging from '../pages/MessageCharging';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import './musicCard.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      show: true,
      checked: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.addFavoriteSong = this.addFavoriteSong.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  componentDidMount() {
    const { requestFavoriteSongs, trackId } = this.props;
    // if (typeof changeStateRemoveFavoriteSongs === 'function');

    const favoriteSong = requestFavoriteSongs.filter(
      (song) => parseInt(song.trackId, 10) === trackId,
    );
    if (favoriteSong.length) {
      this.changeState();
    }
  }

  handleChange({ target }) {
    const { trackName, previewUrl, trackId, changeStateRemoveFavoriteSongs } = this.props;
    if (target.checked) {
      this.setState(
        {
          loading: true,
          checked: true,
        },
        () => {
          const TIMEOUT = 1000;
          setTimeout(
            () => this.addFavoriteSong({ trackName, previewUrl, trackId }),
            TIMEOUT,
          );
        },
      );
    } else {
      this.setState({
        loading: true,
        checked: false,
      }, () => {
        const TIMEOUT = 1000;
        setTimeout(() => {
          // removeSong({ trackName, previewUrl, trackId });
          if (typeof changeStateRemoveFavoriteSongs === 'function') {
            this.setState({
              show: false,
            }, () => changeStateRemoveFavoriteSongs({ trackId }));
            // changeStateRemoveFavoriteSongs({ trackId });
          } else {
            removeSong({ trackId });
          }

          this.setState({
            loading: false,
          });
        }, TIMEOUT);
      });
    }
  }

  changeState() {
    this.setState({
      checked: true,
    });
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
    const { checked, loading, show } = this.state;
    return (
      <>
        {loading && <MessageCharging />}
        <div>
          {/* {show && <div>{trackName}</div>} */}
          {show && (
            <div className="flex-container-music">
              <div className="child">{trackName}</div>
              <div>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>
              </div>

              {show && (
                <div className="label">
                  <label htmlFor="favorita">
                    Favorita
                    <input
                      id="favorita"
                      type="checkbox"
                      checked={ checked }
                      data-testid={ `checkbox-music-${trackId}` }
                      onChange={ (event) => this.handleChange(event) }
                    />
                  </label>
                </div>
              )}
            </div>
          )}

        </div>

      </>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  requestFavoriteSongs: PropTypes.arrayOf(Object).isRequired,
  changeStateRemoveFavoriteSongs: PropTypes.func,
};

MusicCard.defaultProps = {
  changeStateRemoveFavoriteSongs: undefined,
};

export default MusicCard;
