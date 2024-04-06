/* eslint-disable no-magic-numbers */
import React from 'react';
import { Redirect } from 'react-router-dom';
import * as services from '../services/userAPI';
import MessageCharging from './MessageCharging';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonValue: true,
      value: '',
      loading: false,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // this.handleSubmit = this.handleSubmit(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleClick() {
    const { value } = this.state;
    services.createUser({ name: value });

    this.setState({
      loading: true,
    }, () => {
      setTimeout(() => this.setState({ redirect: true }), 2000);
    });
  }

  handleChange({ target }) {
    const MAGICNUMBER = 3;
    const { value } = target;

    this.setState({
      value,
    }, () => {
      if (value.length >= MAGICNUMBER) {
        this.setState({
          buttonValue: false,
        });
      } else {
        this.setState(
          {
            buttonValue: true,
          },
        );
      }
    });
  }

  render() {
    const { buttonValue, value, loading, redirect } = this.state;

    return (
      <div data-testid="page-login">
        {/* <p>TrybeTunes</p> */}
        <form onSubmit={ (event) => this.handleSubmit(event) }>
          <label htmlFor="loginForm">
            Name:
            <input
              data-testid="login-name-input"
              onChange={ (event) => this.handleChange(event) }
              value={ value }
            />
            <button
              type="submit"
              value="submit"
              disabled={ buttonValue }
              data-testid="login-submit-button"
              onClick={ this.handleClick }
              name="loginForm"
            >
              Entrar
            </button>
          </label>
        </form>
        {loading && <MessageCharging to="/search" />}
        {redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
