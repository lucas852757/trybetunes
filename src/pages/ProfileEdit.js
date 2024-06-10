import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import MessageCharging from './MessageCharging';
import './profileEdit.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      show: false,
      name: '',
      email: '',
      description: '',
      image: '',
      disabled: true,
    };

    this.changeStateLoading = this.changeStateLoading.bind(this);
    this.changeSateUser = this.changeSateUser.bind(this);
    this.changeStateShow = this.changeStateShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.turnONTurnOFFButton = this.turnONTurnOFFButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const infoUser = await getUser();
    this.changeSateUser(infoUser);
    this.changeStateLoading();
  }

  handleChange({ target }) {
    const { value, name } = target;
    if (name === 'name') {
      this.setState(
        {
          name: value,
        },
        () => this.turnONTurnOFFButton(),
      );
    }

    if (name === 'email') {
      this.setState(
        {
          email: value,
        },
        () => this.turnONTurnOFFButton(),
      );
    }

    if (name === 'description') {
      this.setState(
        {
          description: value,
        },
        () => this.turnONTurnOFFButton(),
      );
    }
    if (name === 'image') {
      this.setState(
        {
          image: value,
        },
        () => this.turnONTurnOFFButton(),
      );
    }
  }

  async handleClick() {
    const { history } = this.props;
    const { name, email, description, image } = this.state;
    const response = await updateUser({ name, email, description, image });

    if (response === 'OK') {
      history.push('/profile');
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  turnONTurnOFFButton() {
    const { name, email, image, description } = this.state;
    if (name.length && email && image && description) {
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
    const { name, email, image, description } = arg;
    this.setState(
      {
        name,
        email,
        image,
        description,
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
    const { loading, show, name, email, description, image, disabled } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading && <MessageCharging />}
        {show && <div>{image}</div>}
        {show && (
          <div>
            Nome
            {name}
          </div>
        )}
        {show && (
          <div>
            E-mail
            {email}
          </div>
        )}
        {show && (
          <div>
            Descrição
            {description}
          </div>
        )}
        {show && (
          <div className="center-profile-edit">
            <form
              className="form-profile-edit"
              onSubmit={ (event) => this.handleSubmit(event) }
            >
              <label htmlFor="inputName">
                <p className="profile-name">Nome</p>
                <input
                  name="name"
                  data-testid="edit-input-name"
                  value={ name }
                  onChange={ (event) => this.handleChange(event) }
                />
              </label>
              <label htmlFor="inputEmail">
                <p className="profile-email">E-mail</p>
                <input
                  data-testid="edit-input-email"
                  name="email"
                  value={ email }
                  onChange={ (event) => this.handleChange(event) }
                />
              </label>
              <label htmlFor="inputDescription">
                <p className="profile-description">Descrição</p>
                <input
                  name="description"
                  data-testid="edit-input-description"
                  value={ description }
                  onChange={ (event) => this.handleChange(event) }
                />
              </label>
              <label htmlFor="image">
                <p className="profile-image">Imagem</p>
                <input
                  data-testid="edit-input-image"
                  name="image"
                  value={ image }
                  onChange={ (event) => this.handleChange(event) }
                />
              </label>
            </form>
            {' '}
            <button
              className="profile-edit-button"
              type="submit"
              value="submit"
              data-testid="edit-button-save"
              onClick={ this.handleClick }
              disabled={ disabled }
            >
              Salvar
            </button>
          </div>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};

export default ProfileEdit;
