import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import MessageCharging from './MessageCharging';
import user from '../images/account_circle_24dp_FILL1_wght400_GRAD0_opsz24.svg';
import './profile.css';

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
    const { loading, infoUser } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <div className="loading">
          <div>{loading && <MessageCharging />}</div>
        </div>
        <main>
          {!loading && (
            <div className="center-flex-container-profile">
              <div>
                <div className="center-flex-container-image">
                  {infoUser.image ? (
                    <img
                      className="img-48"
                      data-testid="profile-image"
                      src={ infoUser.image }
                      alt=""
                      height="48"
                      width="48"
                    />
                  ) : (
                    <img src={ user } alt="" height="48" width="48" />
                  )}
                </div>
                <p>Nome</p>
                <p className="name">{infoUser.name}</p>
                <p>E-mail</p>
                <p className="email">{infoUser.email}</p>
                <p>Descrição</p>
                <p>{infoUser.description}</p>
              </div>
              <div>
                <Link className="flex-link profile-edit" to="/profile/edit">
                  Editar perfil
                </Link>
              </div>
            </div>
          )}
        </main>

      </div>
    );
  }
}

export default Profile;
