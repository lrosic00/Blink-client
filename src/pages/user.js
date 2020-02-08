import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import Blink from "../components/blink/Blink";
import StaticProfile from "../components/profile/StaticProfile";

//Redux
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

//MUI
import Grid from "@material-ui/core/Grid";

class user extends Component {
	state = {
		profile: null,
		blinkIdParam: null
	};

	componentDidMount() {
		const handle = this.props.match.params.handle;
		const blinkId = this.props.match.params.blinkId;

		if (blinkId) {
			this.setState({ blinkIdParam: blinkId });
		}

		this.props.getUserData(handle);
		axios
			.get(`/user/${handle}`)
			.then(res => {
				this.setState({ profile: res.data.user });
			})
			.catch(err => console.log(err));
	}
	render() {
		const { blinks, loading } = this.props.data;
		const { blinkIdParam } = this.state;

		const blinksMarkup = loading ? (
			<p>loading data...</p>
		) : blinks === null ? (
			<p>no blinks from this user</p>
		) : !blinkIdParam ? (
			blinks.map(blink => <Blink key={blink.blinkId} blink={blink} />)
		) : (
			blinks.map(blink => {
				if (blink.blinkId !== blinkIdParam)
					return <Blink key={blink.blinkId} blink={blink} />;
				else
					return <Blink key={blink.blinkId} blink={blink} openDialog={true} />;
			})
		);
		{
		}
		return (
			<Grid container spacing={7}>
				<Grid item sm={4} xs={12}>
					{this.state.profile === null ? (
						<p>loading profile...</p>
					) : (
						<StaticProfile profile={this.state.profile} />
					)}
				</Grid>
				<Grid item sm={8} xs={12}>
					{blinksMarkup}
				</Grid>
			</Grid>
		);
	}
}

user.propTypes = {
	getUserData: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	data: state.data
});

export default connect(mapStateToProps, { getUserData })(user);
