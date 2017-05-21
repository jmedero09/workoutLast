import React, { Component } from 'react';

export default class Logout extends Component {
  render() {
    const { onLogoutClick } = this.props;

    return (
      <button onClick={() => onLogoutClick()} className="button small">
        Logout
      </button>
    );
  }
}
