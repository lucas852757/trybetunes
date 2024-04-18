import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import MessageCharging from './MessageCharging';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      buttonValue: true,
      loading: false,
      value: '',
      disabledInput: false,
      responseAPI: [],
      show: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.searchAlbums = this.searchAlbums.bind(this);
  }

  handleChange({ target }) {
    const { value } = target;

    this.setState({
      value,
    });

    if (value.length >= 2) {
      this.setState({ buttonValue: false });
    } else {
      this.setState({ buttonValue: true });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  // Bug
  async handleClick() {
    const { value } = this.state;
    this.setState({
      buttonValue: true,
      loading: false,
      disabledInput: true,
      show: true,
      responseAPI: [...(await this.searchAlbums(value))],
    });

    this.setState({ artist: value }, () => this.setState({ value: '' }));
  }

  searchAlbums(artist) {
    return searchAlbumsAPI(artist);
  }

  render() {
    const {
      value,
      buttonValue,
      loading,
      disabledInput,
      responseAPI,
      artist,
      show,
    } = this.state;

    return (
      <>
        <div data-testid="page-search">
          <Header />
        </div>
        <form onSubmit={ (event) => this.handleSubmit(event) }>
          <label htmlFor="searchLogin">
            <input
              onChange={ (event) => this.handleChange(event) }
              data-testid="search-artist-input"
              value={ value }
              disabled={ disabledInput }
            />
            <button
              data-testid="search-artist-button"
              onClick={ this.handleClick }
              type="submit"
              disabled={ buttonValue }
              value="submit"
            >
              Procurar
            </button>
          </label>
        </form>
        {loading && <MessageCharging />}

        {show && (
          <div>
            {' '}
            {responseAPI.length > 0
              ? `Resultado de álbuns de: ${artist}`
              : 'Nenhum álbum foi encontrado'}
          </div>
        )}
        {responseAPI.map(({ collectionName, artistName, collectionId }, index) => (
          <div key={ index }>
            <Link
              // { ...collectionId }
              to={ { pathname: `/album/${collectionId}` } }
              data-testid={ `link-to-album-${collectionId}` }
            >
              {collectionName}
            </Link>
            {artistName}
          </div>
        ))}
      </>
    );
  }
}

export default Search;
