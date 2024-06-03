import React from 'react';
import { Link } from 'react-router-dom';
import MessageCharging from '../pages/MessageCharging';
import { getUser } from '../services/userAPI';
import './header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: true,
    };

    this.handleGetUser = this.handleGetUser.bind(this);
  }

  async componentDidMount() {
    await this.handleGetUser();
  }

  async handleGetUser() {
    const userInfo = await getUser();
    const { name } = userInfo;

    this.setState({ name, loading: false });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header className="grid-container" data-testid="header-component">
        <div className="loading">
          {loading && <MessageCharging />}
        </div>

        <div className="header-top">
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          />
          <div className="header-top-mark">
            trybe
            {' '}
            <span className="material-symbols-outlined material-icons md-18">
              headphones
            </span>
            <div className="header-tunes">tunes</div>
          </div>
          <div className="header-user-name">
            <span
              className="material-symbols-outlined material-icons md-36"
              style={ { float: 'left', paddingRight: '30px' } }
            >
              account_circle
            </span>
            <div
              style={ {
                float: 'right',
                paddingRight: '30px',
                paddingTop: '10px',
              } }
              data-testid="header-user-name"
            >
              {name}
            </div>
            <div />
          </div>
        </div>

        {!loading && (
          <>
            <Link
              className="header-search border"
              to="/search"
              data-testid="link-to-search"
            >
              {' '}
              Pesquisa
              {' '}
            </Link>
            <Link
              className="header-favorite border"
              to="/favorites"
              data-testid="link-to-favorites"
            >
              Favoritas
            </Link>
            <Link
              className="header-profile border"
              to="/profile"
              data-testid="link-to-profile"
            >
              Perfil
            </Link>
          </>
        )}
      </header>
    );
  }
}

export default Header;
