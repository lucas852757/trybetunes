import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import MessageCharging from './MessageCharging';
import user from '../images/account_circle_24dp_FILL1_wght400_GRAD0_opsz24.svg';
// import './profile.css';

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
        <div className="loading">
          <div>
            {loading && <MessageCharging />}
          </div>
        </div>

        <div
          style={ {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          } }
        >
          {!loading && (
            <>
              <img src={ user } alt="" height="48" width="48" />
              <p>Nome</p>
              <div
                style={ {
                  fontSize: 'small',
                } }
              >
                {name}
              </div>
              <p>E-mail</p>
              <div
                style={ {
                  fontSize: 'small',
                } }
              >
                {email}
              </div>
              <img data-testid="profile-image" src={ image } alt="" />
              <p>Descrição:</p>
              <div
                style={ {
                  fontSize: 'small',
                } }
              >
                {description}
              </div>
              <Link
                style={ {
                  textDecoration: 'none',
                  border: 'solid blue 1px',
                  backgroundColor: 'blue',
                  color: 'white',
                  borderRadius: '5px 5px 5px 5px',
                  paddingLeft: '5px',
                  paddingRight: '5px',
                } }
                to="/profile/edit"
              >
                Editar perfil
              </Link>
            </>)}

        </div>

      </div>);
  }
}

export default Profile;
