import React from 'react';
// import { getMusics } from '../services/musicsAPI';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: ''
    };
  }

  async componentDidMount() {
    const { location } = this.props;
    const { state } = location;
    console.log(await getMusics(state.collectionId));
  }

  render() {
    const { location } = this.props;
    const { state } = location;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          {state.collectionId}
        </div>
      </div>);
  }
}

Album.propTypes = {
  location: PropTypes.objectOf(String).isRequired,
  collectionId: PropTypes.string.isRequired,
};

export default Album;
