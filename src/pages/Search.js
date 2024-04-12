import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonValue: true,
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
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

  render() {
    const { value, buttonValue } = this.state;
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
            />
            <button
              data-testid="search-artist-button"
              type="submit"
              disabled={ buttonValue }
              value="submit"
            >
              Procurar
            </button>
          </label>
        </form>
      </>

    );
  }
}

export default Search;
