import React from 'react';
import { Link } from 'react-router-dom';
import MessageCharging from '../pages/MessageCharging';
import { getUser } from '../services/userAPI';

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
      <header data-testid="header-component">
        {loading && <MessageCharging />}
        <div data-testid="header-user-name">
          {name}
        </div>
        <Link to="/search" data-testid="link-to-search"> Pesquisa </Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
