import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Logout from './Logout';
import { loginUser, logoutUser } from '../actions';

export default class Navbar extends Component {
  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props;
    return (
      <nav className="{navbar}">
        <div className="{container-fluid}">
          <div className="{small-centered text-center small-12 columns }">
            <Link to="/"><img className="{logoImg}" src="logo.png" /></Link>
          </div>

          <div>
            {!isAuthenticated &&
              <Login
                errorMessage={errorMessage}
                onLoginClick={creds => dispatch(loginUser(creds))}
              />}
            {isAuthenticated &&
              <Logout onLogoutClick={() => dispatch(logoutUser())} />}

            <div className="btn-container">
              <button className="button small"><Link to="/dashboard">Dashboard</Link></button>
              <button className="button small"><Link to="/workouts">Workouts</Link></button>
            </div>

          </div>
        </div>
      </nav>
    );
  }
}
