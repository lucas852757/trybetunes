import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import MessageCharging from './MessageCharging';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      infoUser: {},
    };

    this.changeStateLoading = this.changeStateLoading.bind(this);
    this.changeStateUser = this.changeStateUser.bind(this);
  }

  async componentDidMount() {
    const infoUser = await getUser();
    this.changeStateUser(infoUser);
    this.changeStateLoading(infoUser);
  }

  changeStateLoading() {
    this.setState({
      loading: false,
    });
  }

  changeStateUser(arg) {
    this.setState({
      infoUser: { ...arg },
    });
  }

  render() {
    const { loading, infoUser: { name, email, image, description } } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading && <MessageCharging />}
        <div>{name}</div>
        <div>{email}</div>
        <img data-testid="profile-image" src={ image } alt="" />
        <div>{description}</div>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>);
  }
}

export default Profile;
