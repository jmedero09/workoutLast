import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  render() {
    const { errorMessage } = this.props;

    return (
      <div className="row">
        <div className="small-12 small-centered columns login-container">
          <p>Please Use your email and password to login to your dashboard</p>
          <div className="row">
            <div>
              <div className="small-11 small-centered columns">
                <input
                  style={{ marginRight: '5px' }}
                  className="username text-center"
                  type="text"
                  ref="username"
                  placeholder="username"
                />
                <input
                  style={{ marginRight: '5px' }}
                  className="password text-center"
                  type="password"
                  ref="password"
                  placeholder="Password"
                />
              </div>
              <button
                onClick={event => this.handleClick(event)}
                className="button expanded">
                Login
              </button>
              <button className="button expanded">Create User</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  handleClick(event) {
    const username = this.refs.username;
    const password = this.refs.password;
    const creds = {
      username: username.value.trim(),
      password: password.value.trim()
    };
    this.props.onLoginClick(creds);
  }
}
