import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import MessageCharging from './MessageCharging';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonValue: true,
      loading: false,
      value: '',
      disabledInput: false,
      responseAPI: false,
      text: '',
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
    const { value, responseAPI } = this.state;
    this.setState({ buttonValue: true,
      loading: true,
      disabledInput: true,
      responseAPI: await this.searchAlbums(value) });
    // const response = await this.searchAlbums(value);

    if (responseAPI) {
      this.setState({ loading: false, text: `Resultado de álbuns de: ${value}` });
    } else {
      this.setState({ loading: false, text: 'Nenhum álbum foi encontrado' });
    }

    this.setState({ value: '' });
  }

  async searchAlbums(artist) {
    await searchAlbumsAPI(artist);
  }

  render() {
    const { value, buttonValue, loading, disabledInput, text } = this.state;
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
        <div>
          {text}
        </div>
      </>

    );
  }
}

export default Search;
