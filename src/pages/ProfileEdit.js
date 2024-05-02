import React from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import MessageCharging from './MessageCharging';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      show: false,
      infoUser: {},
      valueName: '',
      valueEmail: '',
      valueDescription: '',
      valueImage: '',
    };

    this.changeStateLoading = this.changeStateLoading.bind(this);
    this.changeSateUser = this.changeSateUser.bind(this);
    this.changeStateShow = this.changeStateShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const infoUser = await getUser();
    this.changeSateUser(infoUser);
    this.changeStateLoading();
  }

  handleChange({ target }) {
    const { value, name } = target;
    if (name === 'name') {
      this.setState({
        valueName: value,
      });
    }

    if (name === 'email') {
      this.setState({
        valueEmail: value,
      });
    }

    if (name === 'description') {
      this.setState({
        valueDescription: value,
      });
    }
    if (name === 'image') {
      this.setState({
        valueImage: value,
      });
    }
  }

  changeStateLoading() {
    this.setState({
      loading: false,
    });
  }

  changeSateUser(arg) {
    this.setState(
      {
        infoUser: { ...arg },
      },
      () => this.changeStateShow(),
    );
  }

  changeStateShow() {
    this.setState({
      show: true,
    });
  }

  render() {
    const {
      loading,
      show,
      valueName,
      valueEmail,
      valueDescription,
      valueImage,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading && <MessageCharging />}
        {show && (
          <form>
            <label htmlFor="inputName">
              Nome
              <input
                name="name"
                data-testid="edit-input-name"
                value={ valueName }
                onChange={ (event) => this.handleChange(event) }
              />
            </label>
            <label htmlFor="inputEmail">
              Email
              <input
                data-testid="edit-input-email"
                name="email"
                value={ valueEmail }
                onChange={ (event) => this.handleChange(event) }
              />
            </label>
            <label htmlFor="inputDescription">
              Descrição
              <input
                name="description"
                data-testid="edit-input-description"
                value={ valueDescription }
                onChange={ (event) => this.handleChange(event) }
              />
            </label>
            <label htmlFor="image">
              Imgem
              <input
                data-testid="edit-input-image"
                name="image"
                value={ valueImage }
                onChange={ (event) => this.handleChange(event) }
              />
            </label>
          </form>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
