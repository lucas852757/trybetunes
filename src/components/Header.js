import React from 'react';
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
      </header>
    );
  }
}

export default Header;
