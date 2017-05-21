import React, { Component } from 'react';

class SetReps extends Component {
  constructor(props) {
    super(props);
  }

  render(props) {
    return (
      <div className="row small-centered">
        <div className="setreps small-12 columns">
          <p>
            Set
            {this.props.set}
            Weight:
            {this.props.weight}
            x
            {this.props.reps}
            Reps
          </p>
        </div>
      </div>
    );
  }
}

export default SetReps;
