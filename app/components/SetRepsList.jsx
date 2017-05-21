import React, { Component } from 'react';
import {connect} from 'react-redux';
import SetReps from './SetReps';

class SetRepsList extends Component {
	constructor(props){
		super(props);
	}

	renderList(){
		return this.props.map((details,index)=>{
			return(
				<li key={index}>
					<SetReps weight={details.weight} reps={details.reps}/>
				</li>
			)
		});					
	}
	render(props){
		return (
			<ul className="small-centered  small-12 columns text-center">
				{this.renderList()}
			</ul>
		)
	}
}
export default SetRepsList;
  