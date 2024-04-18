import React from 'react';
// import { getMusics } from '../services/musicsAPI';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      collectionName: '',
    };

    this.handleState = this.handleState.bind(this);
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    const result = await getMusics(id);
    const { artistName, collectionName } = result[0];
    this.handleState(artistName, collectionName);
  }

  handleState(artistName, collectionName) {
    this.setState({
      artistName,
      collectionName,
    });
  }

  render() {
    const { artistName, collectionName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div data-testid="album-name">
          {collectionName}
        </div>
        <div data-testid="artist-name">
          {artistName}
        </div>
      </div>);
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(Object).isRequired,
};

export default Album;
