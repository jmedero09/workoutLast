import React, { Component } from 'react';

export default class WorkoutTile extends Component {
  constructor(props) {
    super(props);
  }
  render(props) {
    return (
      <div className="row">

        <div className="savedTitle small-centered columns">
          <h1>{this.props.name}</h1>
          <p>{this.props.date}</p>
        </div>
      </div>
    );
  }
}
