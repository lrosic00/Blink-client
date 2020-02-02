import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

import Blink from "../components/Blink";
import Profile from "../components/Profile";

import { connect } from "react-redux";
import { getBlinks } from "../redux/actions/dataActions";

import LinearProgress from "@material-ui/core/LinearProgress";

export class home extends Component {
	componentDidMount() {
		this.props.getBlinks();
	}
	render() {
		const { blinks, loading } = this.props.data;
		let recentBlinksMarkup = !loading ? (
			blinks.map(blink => <Blink key={blink.blinkId} blink={blink} />)
		) : (
			<LinearProgress color="secondary" />
		);
		return (
			<Grid container spacing={6}>
				<Grid item sm={4} xs={12}>
					<Profile />
				</Grid>
				<Grid item sm={8} xs={12}>
					{recentBlinksMarkup}
				</Grid>
			</Grid>
		);
	}
}

home.propTypes = {
	getBlinks: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	data: state.data
});

export default connect(mapStateToProps, { getBlinks })(home);
