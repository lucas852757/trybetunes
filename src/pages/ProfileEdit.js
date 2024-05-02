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
      valueName: '',
      valueEmail: '',
      valueDescription: '',
      valueImage: '',
      disabled: true,
    };

    this.changeStateLoading = this.changeStateLoading.bind(this);
    this.changeSateUser = this.changeSateUser.bind(this);
    this.changeStateShow = this.changeStateShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.turnONTurnOFFButton = this.turnONTurnOFFButton.bind(this);
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
      }, () => this.turnONTurnOFFButton());
    }

    if (name === 'email') {
      this.setState({
        valueEmail: value,
      }, () => this.turnONTurnOFFButton());
    }

    if (name === 'description') {
      this.setState({
        valueDescription: value,
      }, () => this.turnONTurnOFFButton());
    }
    if (name === 'image') {
      this.setState({
        valueImage: value,
      }, () => this.turnONTurnOFFButton());
    }
  }

  handleClick() {

  }

  turnONTurnOFFButton() {
    const { valueName, valueEmail, valueImage, valueDescription } = this.state;
    if (valueName.length && valueEmail && valueImage && valueDescription) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
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
      disabled,
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
        <button
          type="submit"
          value="submit"
          data-testid="edit-button-save"
          onClick={ (event) => this.handleClick(event) }
          disabled={ disabled }
        >
          Salvar
        </button>
      </div>
    );
  }
}

export default ProfileEdit;
