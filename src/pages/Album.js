import React from 'react';
// import { getMusics } from '../services/musicsAPI';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      collectionName: '',
      requestHTTP: [],
    };

    this.handleState = this.handleState.bind(this);
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const result = await getMusics(id);

    this.handleState(result);
  }

  handleState(arg) {
    const { artistName, collectionName } = arg[0];
    this.setState({
      artistName,
      collectionName,
      requestHTTP: [...arg],
    });
  }

  render() {
    const { artistName, collectionName, requestHTTP } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div data-testid="album-name">{collectionName}</div>
        <div data-testid="artist-name">{artistName}</div>
        {requestHTTP
          .filter(({ kind }) => kind)
          .map(({ trackName, previewUrl, trackId }, index) => (
            <MusicCard key={ index } { ...{ trackName, previewUrl, trackId } } />
          ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(Object).isRequired,
};

export default Album;
